import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import styles from "./style.module.css";
import ReadMore from "@/pages/manifest/shared/ReadMore";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);
const hop = CustomEase.create("hop", "0.9, 0, 0.1, 1");

const reduceMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const DESKTOP_TOTAL = 300;
const WORDMARK = "[yeqq]";

const getParticleTotal = () => {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return DESKTOP_TOTAL;
  }

  if (window.matchMedia("(max-width: 600px)").matches) return 140;
  if (window.matchMedia("(max-width: 1024px)").matches) return 220;
  return DESKTOP_TOTAL;
};

// wordmark'ı outfit ile büyük boyutta gizli bir canvas'a çizer, sonra düzenli
// bir ızgarada dolu hücre merkezlerini nokta hedeflerine çevirir; led panel
// gibi eşit aralıklı, net bir dizilim çıkar. düzen kurulunca ortaya kimlik çıkar.
const buildTargets = (count, container) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  const fs = 100; // büyük çiz, ızgarayla örnekle: ince çizgiler kaybolmaz
  const font = `600 ${fs}px "Outfit", sans-serif`;

  ctx.font = font;
  canvas.width = Math.ceil(ctx.measureText(WORDMARK).width) + 8;
  canvas.height = Math.ceil(fs * 1.6);
  ctx.font = font; // canvas yeniden boyutlanınca context sıfırlanır
  ctx.textBaseline = "middle";
  ctx.fillText(WORDMARK, 4, canvas.height / 2);

  const img = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  const filled = (x, y) => img[(y * canvas.width + x) * 4 + 3] > 128;

  // ızgara adımını, hücre sayısı nokta sayısının altına inene kadar büyüt;
  // böylece eldeki her nokta bir hücreye oturur, boş hedef kalmaz
  let pts = [];
  for (let g = 3; g <= 20; g++) {
    pts = [];
    for (let y = Math.floor(g / 2); y < canvas.height; y += g) {
      for (let x = Math.floor(g / 2); x < canvas.width; x += g) {
        if (filled(x, y)) {
          pts.push({ x: x - canvas.width / 2, y: y - canvas.height / 2 });
        }
      }
    }
    if (pts.length && pts.length <= count) break;
  }
  if (!pts.length) return null;

  // sahneye ölçekle ve butonun üstüne kaldır
  const scale = Math.min(container.offsetWidth * 0.55, 520) / canvas.width;
  const offsetY = -container.offsetHeight * 0.16;

  // artan noktalar mevcut hücrelerin üzerine birebir biner (görünmez kopya)
  const out = [];
  for (let i = 0; i < count; i++) {
    const p = pts[i % pts.length];
    out.push({ x: p.x * scale, y: p.y * scale + offsetY });
  }
  return out;
};

export default function CostOfOrder({ isActive = true }) {
  const { t, i18n } = useTranslation();
  const containerRef = useRef(null);
  const dotsRef = useRef([]);
  const pulsesRef = useRef([]);
  const holdingRef = useRef(false);
  const activeRef = useRef(isActive);
  const particleTotalRef = useRef(getParticleTotal());

  // hareket azaltılmışsa: kaos döngüsü yok, tek seferlik statik saçılım
  const scatterStatic = () => {
    const c = containerRef.current;
    if (!c) return;
    dotsRef.current.forEach((dot) => {
      if (!dot) return;
      gsap.set(dot, {
        x: gsap.utils.random(-c.offsetWidth * 0.4, c.offsetWidth * 0.4),
        y: gsap.utils.random(-c.offsetHeight * 0.4, c.offsetHeight * 0.4),
        scale: gsap.utils.random(0.5, 1.6),
        opacity: gsap.utils.random(0.25, 0.8),
      });
    });
  };

  // entropi: nokta amaçsızca sürüklenir; boyutu ve opaklığı da düzensizdir
  const animateChaos = (dot) => {
    const c = containerRef.current;
    if (!dot || !c || !activeRef.current) return;
    gsap.to(dot, {
      x: () => gsap.utils.random(-c.offsetWidth * 0.4, c.offsetWidth * 0.4),
      y: () => gsap.utils.random(-c.offsetHeight * 0.4, c.offsetHeight * 0.4),
      scale: () => gsap.utils.random(0.5, 1.6),
      opacity: () => gsap.utils.random(0.25, 0.8),
      duration: () => gsap.utils.random(3, 8),
      ease: "hop",
      overwrite: "auto",
      force3D: true,
      onComplete: () => {
        if (!holdingRef.current && activeRef.current) animateChaos(dot);
      },
    });
  };

  // basış: noktalar kelimenin merkezinden dışa yayılan dalgayla
  // [ yeqq ] yazısına oturur; boyut ve opaklık eşitlenir
  const applyOrder = () => {
    if (!activeRef.current) return;

    const c = containerRef.current;
    const dots = dotsRef.current.filter(Boolean);
    if (!c || !dots.length) return;
    gsap.killTweensOf(dots);

    const targets = buildTargets(dots.length, c);
    if (!targets) return;

    if (reduceMotion()) {
      dots.forEach((dot, i) => {
        gsap.set(dot, {
          x: targets[i].x,
          y: targets[i].y,
          scale: 1,
          opacity: 1,
        });
      });
      return;
    }

    // dalga merkezi: kelimenin orta noktası
    const cy = targets.reduce((sum, p) => sum + p.y, 0) / targets.length;
    const maxDist = targets.reduce(
      (max, p) => Math.max(max, Math.hypot(p.x, p.y - cy)),
      1,
    );

    dots.forEach((dot, i) => {
      const p = targets[i];
      gsap.to(dot, {
        x: p.x,
        y: p.y,
        scale: 1,
        opacity: 1,
        duration: 1.2,
        delay: (Math.hypot(p.x, p.y - cy) / maxDist) * 0.45,
        ease: "hop",
        overwrite: true,
        force3D: true,
      });
    });
  };

  // bırakış: çürüme — grid bir anda değil, rastgele sırayla ve
  // hızlanarak çözülür; noktalar önce hafifçe dökülür, sonra sürüklenir
  const decay = () => {
    if (!activeRef.current) return;

    const dots = dotsRef.current.filter(Boolean);
    gsap.killTweensOf(dots);

    if (reduceMotion()) {
      scatterStatic();
      return;
    }

    dots.forEach((dot) => {
      // gecikmeler sona yığılır: önce tek tük, sonra sağanak
      const delay = (1 - Math.pow(Math.random(), 2)) * 0.8;
      gsap.to(dot, {
        x: `+=${gsap.utils.random(-36, 36)}`,
        y: `+=${gsap.utils.random(18, 48)}`,
        scale: () => gsap.utils.random(0.5, 1.6),
        opacity: () => gsap.utils.random(0.25, 0.8),
        duration: 2,
        delay,
        ease: "hop",
        overwrite: true,
        onComplete: () => {
          if (!holdingRef.current && activeRef.current) animateChaos(dot);
        },
      });
    });
  };

  // bedelin görseli: basılı tutarken butondan dışarı enerji dalgaları yayılır
  const startPulses = () => {
    if (reduceMotion() || !activeRef.current) return;
    pulsesRef.current.forEach((p, i) => {
      if (!p) return;
      gsap.fromTo(
        p,
        { scale: 0.5, autoAlpha: 0.5 },
        {
          scale: 3,
          autoAlpha: 0,
          duration: 1.5,
          ease: "hop",
          repeat: -1,
          delay: i * 0.75,
        },
      );
    });
  };

  const stopPulses = () => {
    const pulses = pulsesRef.current.filter(Boolean);
    gsap.killTweensOf(pulses);
    gsap.to(pulses, { autoAlpha: 0, duration: 0.3, overwrite: true });
  };

  const handleDown = (e) => {
    e.preventDefault();

    if (!activeRef.current) return;

    if (e.currentTarget.setPointerCapture && e.pointerId != null) {
      e.currentTarget.setPointerCapture(e.pointerId);
    }

    if (holdingRef.current) return;

    holdingRef.current = true;
    applyOrder();
    startPulses();
  };

  const handleUp = (e) => {
    e?.preventDefault();

    if (
      e?.currentTarget?.releasePointerCapture &&
      e.pointerId != null &&
      e.currentTarget.hasPointerCapture?.(e.pointerId)
    ) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }

    if (!holdingRef.current) return;

    holdingRef.current = false;
    decay();
    stopPulses();
  };

  useEffect(() => {
    // canvas örneklemesi için fontu ısıt (ilk basışta hazır olsun)
    if (typeof document !== "undefined" && document.fonts?.load) {
      document.fonts.load('600 100px "Outfit"').catch(() => {});
    }
  }, []);

  useEffect(() => {
    activeRef.current = isActive;
    const dots = dotsRef.current.filter(Boolean);
    const pulses = pulsesRef.current.filter(Boolean);

    gsap.killTweensOf(dots);
    gsap.killTweensOf(pulses);

    if (!isActive) {
      holdingRef.current = false;
      gsap.set(pulses, { autoAlpha: 0 });
      scatterStatic();
      return undefined;
    }

    if (reduceMotion()) {
      scatterStatic();
      return undefined;
    }

    dots.forEach((dot) => animateChaos(dot));

    return () => {
      holdingRef.current = false;
      gsap.killTweensOf(dots);
      gsap.killTweensOf(pulses);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  return (
    <div ref={containerRef} className={styles.container}>
      <div className={styles.particle_system}>
        {Array.from({ length: particleTotalRef.current }).map((_, i) => (
          <div
            key={i}
            ref={(el) => (dotsRef.current[i] = el)}
            className={styles.dot}
          />
        ))}
      </div>

      <div className={styles.center}>
        <span
          className={styles.pulse}
          ref={(el) => (pulsesRef.current[0] = el)}
          aria-hidden="true"
        />
        <span
          className={styles.pulse}
          ref={(el) => (pulsesRef.current[1] = el)}
          aria-hidden="true"
        />
        <button
          type="button"
          className={styles.energy_btn}
          onPointerDown={handleDown}
          onPointerUp={handleUp}
          onPointerLeave={handleUp}
          onPointerCancel={handleUp}
          onDragStart={(e) => e.preventDefault()}
          onContextMenu={(e) => e.preventDefault()}
          onKeyDown={(e) => {
            if ((e.key === " " || e.key === "Enter") && !e.repeat) {
              e.preventDefault();
              handleDown(e);
            }
          }}
          onKeyUp={(e) => {
            if (e.key === " " || e.key === "Enter") {
              e.preventDefault();
              handleUp(e);
            }
          }}
        >
          {t("manifesto.cost_of_order.btn_label")}
        </button>
      </div>

      <div className={styles.annotation} key={i18n.language}>
        <h4>{t("manifesto.cost_of_order.title")}</h4>
        <p>{t("manifesto.cost_of_order.desc")}</p>
        <ReadMore slug="entropy" />
      </div>
    </div>
  );
}
