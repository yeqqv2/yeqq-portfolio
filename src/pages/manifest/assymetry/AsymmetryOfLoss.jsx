import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import ReadMore from "@/pages/manifest/shared/ReadMore";
import { prefersReducedMotion } from "@/utils/motion";
import styles from "./style.module.css";

/* çizgi unutmaz — kayıp asimetrisinin telemetrisi.
   canlı akan tek bir hairline: kazanç yukarı sıçrar ve tabana geri söner
   (olay); kayıp tabanın kendisini aşağı taşır ve eski taban arkada hayalet
   bir referans çizgisi olarak kalır (durum). aynı sayıda + ve −, çizgiyi
   başladığı yerin çok altında bırakır: kahneman, tek kelime açıklamadan. */

/* canvas css var() okuyamaz; token karşılıkları sabit hex */
const INK = "#111"; /* wb950 */
const GHOST = "#dcdcdc"; /* wb200 */
const LOSS_RED = "#da1e37"; /* red600 */

const STEP = 1.4; /* px / örnek — çizginin akış adımı */
const HEAD_RATIO = 0.5; /* "şimdi" noktası grafiğin ortasında; sağı boş: gelecek henüz çizilmedi */
const FRAME = 1000 / 60; /* örnekleme periyodu (ms): hız ekrandan bağımsız */
const AMP = 0.16; /* sıçrama/düşüş yüksekliği (grafik yüksekliği oranı) */
const HEAL = 1.2; /* px / sn — taban çok yavaş "alışır", asla geri dönmez */
const GHOST_GAP = 10; /* taban, hayalet çizgiye en fazla bu kadar yaklaşır */
const BASE_RATIO = 0.32; /* başlangıç tabanı üst üçte bir: düşecek yeri olsun */

const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

export default function AsymmetryOfLoss() {
  const { t, i18n } = useTranslation();
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const [stats, setStats] = useState({ gains: 0, losses: 0 });

  /* animasyon durumu react'e girmez: her frame değişir */
  const s = useRef({
    ctx: null,
    w: 0,
    h: 0,
    cols: 0,
    hist: null, // kolon başına y: çizginin hafızası
    baseline: 0,
    initial: 0,
    transient: { v: 0 }, // kazanç sıçramasının geçici sapması
    ghosts: [], // eski tabanlar: kalıcı referans çizgileri
    cliffs: [], // kayıp anları: akışla sola kayan kırmızı çentikler
    noiseT: 0,
    acc: 0,
    visible: true,
    reduced: false,
  }).current;

  const draw = () => {
    const { ctx, w, h } = s;
    if (!ctx) return;
    ctx.clearRect(0, 0, w, h);

    /* hayalet tabanlar: kesikli, soluk — unutulmayan referans noktaları */
    ctx.save();
    ctx.strokeStyle = GHOST;
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    s.ghosts.forEach((y) => {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    });
    ctx.restore();

    /* kayıp uçurumları: paneldeki tek renk — düşüşün kendisi kırmızı.
       çentik bir anda belirmez; düşen çizgiyle birlikte yukarıdan
       aşağı uzayarak çizilir (p: 0 → 1) */
    ctx.strokeStyle = LOSS_RED;
    ctx.lineWidth = 1.5;
    s.cliffs.forEach((c) => {
      if (c.x < 0 || c.p <= 0) return;
      ctx.beginPath();
      ctx.moveTo(c.x, c.from);
      ctx.lineTo(c.x, c.from + (c.to - c.from) * c.p);
      ctx.stroke();
    });

    /* çizginin kendisi */
    ctx.strokeStyle = INK;
    ctx.lineWidth = 1.25;
    ctx.lineJoin = "round";
    ctx.beginPath();
    for (let i = 0; i < s.cols; i++) {
      const x = i * STEP;
      if (i === 0) ctx.moveTo(x, s.hist[i]);
      else ctx.lineTo(x, s.hist[i]);
    }
    ctx.stroke();

    /* uç nokta: kalp monitörünün "şimdi"si */
    ctx.fillStyle = INK;
    ctx.beginPath();
    ctx.arc((s.cols - 1) * STEP, s.hist[s.cols - 1], 2.2, 0, Math.PI * 2);
    ctx.fill();
  };

  /* bir örnek ilerlet: hafıza sola kayar, "şimdi" sağdan yazılır */
  const advance = () => {
    /* tabanın alışması: gözle zor seçilir bir yükseliş; hayalete asla değmez */
    const ceiling = s.ghosts.length
      ? s.ghosts[s.ghosts.length - 1] + GHOST_GAP
      : s.initial;
    if (s.baseline > ceiling) {
      s.baseline = Math.max(ceiling, s.baseline - HEAL * (FRAME / 1000));
    }

    /* hafif yaşam titreşimi */
    s.noiseT += FRAME / 1000;
    const noise =
      Math.sin(s.noiseT * 1.7) * 1.1 + Math.sin(s.noiseT * 3.1 + 1) * 0.6;

    const value = clamp(s.baseline + s.transient.v + noise, 6, s.h - 6);

    s.hist.copyWithin(0, 1);
    s.hist[s.cols - 1] = value;
    s.cliffs.forEach((c) => (c.x -= STEP));
    s.cliffs = s.cliffs.filter((c) => c.x > -2);
  };

  const tick = (_time, deltaTime) => {
    if (!s.visible || !s.ctx) return;
    /* sabit periyotlu örnekleme: 120hz ekranda çizgi hızlanmaz */
    s.acc = Math.min(s.acc + deltaTime, FRAME * 4);
    let dirty = false;
    while (s.acc >= FRAME) {
      advance();
      s.acc -= FRAME;
      dirty = true;
    }
    if (dirty) draw();
  };

  /* hareket azaltılmışsa akış yok: durumun anlık fotoğrafı */
  const drawStatic = () => {
    if (!s.ctx) return;
    s.hist?.fill(s.baseline);
    draw();
  };

  /* kazanç: olay. sıçrar, tabana geri söner, iz bırakmaz. */
  const gain = () => {
    setStats((p) => ({ ...p, gains: p.gains + 1 }));
    if (s.reduced) return;

    gsap.killTweensOf(s.transient);
    gsap
      .timeline()
      .to(s.transient, { v: -s.h * AMP, duration: 0.16, ease: "power3.out" })
      .to(s.transient, { v: 0, duration: 1.3, ease: "power2.inOut" });
  };

  /* kayıp: durum. taban aşağı taşınır, eskisi hayalet olarak kalır. */
  const loss = () => {
    setStats((p) => ({ ...p, losses: p.losses + 1 }));

    const from = s.baseline;
    const drop = Math.min(s.h * AMP, s.h * 0.92 - from);

    if (s.reduced) {
      if (drop >= 12) {
        s.ghosts.push(from);
        s.baseline = from + drop;
      }
      drawStatic();
      return;
    }

    if (drop < 12) {
      /* dipteyiz: düşecek yer kalmadı, çizgi yalnızca sarsılır */
      gsap.killTweensOf(s.transient);
      gsap.fromTo(
        s.transient,
        { v: 0 },
        { v: 5, duration: 0.07, yoyo: true, repeat: 5, ease: "power1.inOut" },
      );
      return;
    }

    s.ghosts.push(from);
    const cliff = { x: (s.cols - 1) * STEP, from, to: from + drop, p: 0 };
    s.cliffs.push(cliff);
    /* aynı süre ve ease: kırmızı ucun inişi, düşen çizgiyle bire bir aynı */
    gsap.to(cliff, { p: 1, duration: 0.45, ease: "power4.in" });
    gsap.to(s, { baseline: from + drop, duration: 0.45, ease: "power4.in" });
  };

  const reset = () => {
    gsap.killTweensOf([s, s.transient, ...s.cliffs]);
    s.ghosts = [];
    s.cliffs = [];
    s.baseline = s.initial;
    s.transient.v = 0;
    s.hist?.fill(s.initial);
    setStats({ gains: 0, losses: 0 });
    draw();
  };

  useEffect(() => {
    s.reduced = prefersReducedMotion();
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const init = () => {
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      if (!w || !h) return;

      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      const ctx = canvas.getContext("2d");
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      /* yeniden boyutta durumu oranla taşı; ilk kurulumda üst üçte bir */
      gsap.killTweensOf(s);
      const factor = s.h ? h / s.h : 0;
      s.baseline = factor ? s.baseline * factor : h * BASE_RATIO;
      s.ghosts = factor ? s.ghosts.map((g) => g * factor) : [];
      s.cliffs = [];
      s.initial = h * BASE_RATIO;
      s.cols = Math.max(2, Math.floor((w * HEAD_RATIO) / STEP) + 1);
      s.hist = new Float32Array(s.cols).fill(s.baseline);
      s.ctx = ctx;
      s.w = w;
      s.h = h;

      if (s.reduced) drawStatic();
      else draw();
    };

    init();

    const ro = new ResizeObserver(init);
    ro.observe(wrap);

    /* deste içinde panel ekran dışındayken boşa çizmeyelim */
    const io = new IntersectionObserver(([entry]) => {
      s.visible = entry.isIntersecting;
    });
    io.observe(wrap);

    if (!s.reduced) gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      ro.disconnect();
      io.disconnect();
      gsap.killTweensOf([s, s.transient]);
      s.ctx = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.annotation} key={i18n.language}>
        <h4>{t("manifesto.asymmetry.title")}</h4>
        <p>{t("manifesto.asymmetry.desc")}</p>
        <ReadMore slug="loss" />
      </div>

      <div className={styles.stage}>
        <div ref={wrapRef} className={styles.chart}>
          <canvas
            ref={canvasRef}
            className={styles.canvas}
            aria-hidden="true"
          />
        </div>

        <div className={styles.controls}>
          <button type="button" className={styles.action_btn} onClick={gain}>
            {t("manifesto.asymmetry.build")}
          </button>
          <button type="button" className={styles.action_btn} onClick={loss}>
            {t("manifesto.asymmetry.destruct")}
          </button>
        </div>

        <div className={styles.meta} aria-live="polite">
          <span>
            {t("manifesto.asymmetry.gain_word")} {stats.gains}
          </span>
          <span aria-hidden="true">/</span>
          <span>
            {t("manifesto.asymmetry.loss_word")} {stats.losses}
          </span>
          <button
            type="button"
            className={`${styles.reset} ${
              stats.gains + stats.losses > 0 ? styles.reset_visible : ""
            }`}
            onClick={reset}
            tabIndex={stats.gains + stats.losses > 0 ? 0 : -1}
          >
            [{t("manifesto.asymmetry.reset_label")}]
          </button>
        </div>
      </div>
    </div>
  );
}
