import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./style.module.css";
import { prefersReducedMotion } from "@/utils/motion";

/* imza an — sitenin açılışı tezi yapar: karmaşığı sadeleştirir.
   beatler: (1) parçacıklar kaostan [yeqq] markasına dizilir (kimlik),
   (2) dağılıp kareyi dolduran düzenli bir gride satır satır oturur,
   (3) noktalar büyüyüp taşmadan gerçek bir kareye dönüşür, sonra overlay erir
   ve altta duran temiz hero (IntroSec) kalır — kare aynı yerde, video karesine
   devreder. entropy paneliyle aynı motor: Outfit metni gizli bir canvas'a
   çizilip ızgarayla örneklenir. monokrom, hairline noktalar — glow yok. aynı
   [yeqq] markası entropy panelinde kaostan dizilen, manifesto kapanışında imza
   kalan markadır — site iki ucundan onunla parantezlenir. ilk ziyarette bir kez
   (sessionStorage), reduced-motion'da hiç oynamaz. */

const NAME = "[yeqq]";

// [yeqq] yoğunluğu g=5'te ~398 noktada doğal olarak tıkanır; ~400 = tam doğru
// sayı (israf yok), daha azı seyrek kalır. mobilde okunabilirlik için minimum.
const particleCount = () => {
  if (typeof window === "undefined") return 324;
  const w = window.innerWidth;
  if (w <= 600) return 81; // 9² — okunur minimum
  if (w <= 1024) return 144; // 12²
  return 324; // 18²
};

// video karesinin kenarı: IntroSec .vid ile aynı (masaüstü 60vh, ≤1024 60vw)
const squareSide = () => {
  const w = window.innerWidth;
  const h = window.innerHeight;
  return (w <= 1024 ? w : h) * 0.6;
};

const resolveInk = () => {
  if (typeof window === "undefined") return "#111";
  const v = getComputedStyle(document.documentElement)
    .getPropertyValue("--wb950")
    .trim();
  return v || "#111";
};

// Outfit metnini büyük çiz, ızgarayla örnekle → merkeze hizalı hedef noktalar.
// (entropy panelinin buildTargets'ı, keyfi metin + hedef sayısı için genel hali)
const sampleText = (text, count, maxWidth) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  const fs = 100;
  const font = `600 ${fs}px "Outfit", sans-serif`;

  ctx.font = font;
  canvas.width = Math.ceil(ctx.measureText(text).width) + 8;
  canvas.height = Math.ceil(fs * 1.6);
  ctx.font = font; // canvas yeniden boyutlanınca context sıfırlanır
  ctx.textBaseline = "middle";
  ctx.fillText(text, 4, canvas.height / 2);

  const img = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  const filled = (x, y) => img[(y * canvas.width + x) * 4 + 3] > 128;

  // ızgara adımını, dolu hücre sayısı hedefin altına inene dek büyüt:
  // her noktaya bir hücre düşsün, boş hedef kalmasın
  let pts = [];
  for (let g = 3; g <= 22; g++) {
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

  const scale = maxWidth / canvas.width;
  const out = [];
  for (let i = 0; i < count; i++) {
    const p = pts[i % pts.length];
    out.push({ x: p.x * scale, y: p.y * scale });
  }
  return out;
};

// kareyi dolduran düzenli grid (merkeze hizalı, satır satır = index sırası).
// inset: büyüyen noktalar kareyi aşmasın diye kenar payı. cell de döner ki
// noktaların büyüyeceği nihai yarıçap hücreye göre hesaplansın.
const squareFill = (count, side) => {
  const cols = Math.ceil(Math.sqrt(count));
  const rows = Math.ceil(count / cols);

  const usable = side;
  const cell = usable / cols;

  const x0 = -usable / 2;
  const y0 = -usable / 2;

  const out = new Array(count);

  for (let i = 0; i < count; i++) {
    const col = i % cols;
    const row = (i / cols) | 0;

    out[i] = {
      x: x0 + cell * (col + 0.5),
      y: y0 + cell * (row + 0.5),
    };
  }

  return { targets: out, cell };
};

export default function SignatureIntro({ onAnimationComplete }) {
  const overlayRef = useRef(null);
  const canvasRef = useRef(null);
  const doneRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    // hareket azaltılmışsa: koreografi yok, doğrudan temiz hero'ya
    if (prefersReducedMotion()) {
      onAnimationComplete?.();
      return undefined;
    }

    const prevBody = document.body.style.overflow || "";
    const prevHtml = document.documentElement.style.overflow || "";
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const finish = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      document.body.style.overflow = prevBody;
      document.documentElement.style.overflow = prevHtml;
      onAnimationComplete?.();
    };

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const ink = resolveInk();

    const w = window.innerWidth;
    const h = window.innerHeight;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = particleCount();
    const cx = w / 2;
    const cy = h / 2;
    const side = squareSide();

    // beat 3'te dolan solid kare opaklığı (taşmasız, kesin kenarlı)
    const fx = { sq: 0 };

    // başlangıç: tüm ekrana dağılmış kaos, ince noktalar
    const particles = Array.from({ length: count }, () => ({
      x: gsap.utils.random(-w / 2, w / 2),
      y: gsap.utils.random(-h / 2, h / 2),
      r: gsap.utils.random(0.7, 1.1),
    }));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      ctx.save();

      // clipping alanı
      ctx.beginPath();
      ctx.rect(cx - side / 2, cy - side / 2, side, side);
      ctx.clip();

      ctx.fillStyle = ink;

      // tüm parçacıkları tek path içinde çiz
      ctx.beginPath();

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        ctx.moveTo(cx + p.x + p.r, cy + p.y);

        ctx.arc(cx + p.x, cy + p.y, p.r, 0, Math.PI * 2);
      }

      ctx.fill();

      ctx.restore();
    };

    gsap.ticker.add(draw);

    let tl;
    const begin = () => {
      if (doneRef.current) return;
      const fill = squareFill(count, side);
      const nameTargets =
        sampleText(NAME, count, Math.min(w * 0.28, 340)) || fill.targets;
      const fillTargets = fill.targets;

      tl = gsap.timeline({ onComplete: finish });

      // beat 1: kaos → [yeqq] (kimlik). geniş stagger: akın akın gelip oturur
      tl.to(
        particles,
        {
          x: (i) => nameTargets[i].x,
          y: (i) => nameTargets[i].y,
          duration: 0.66,
          ease: "butter",
          stagger: { amount: 0.66, from: "random" },
        },
        0.2,
      );

      // beat 2: [yeqq] okunsun diye dinlenir, sonra kareyi dolduran düzenli
      // gride satır satır oturur (stagger "start" = index sırası = sıra sıra)
      tl.to(
        particles,
        {
          x: (i) => fillTargets[i].x,
          y: (i) => fillTargets[i].y,
          duration: 1.2,
          ease: "butter",
          stagger: { amount: 1, from: "random" },
        },
        ">+0.5",
      );

      // beat 3: noktalar hücrelerini doldurana dek büyür + solid kare belirir →
      // gerçek, kesin sınırlı kare (taşma yok)
      tl.to(
        particles,
        {
          r: fill.cell * 0.75,
          duration: 0.33,
          ease: "butter",
          stagger: { amount: 0.33, from: "random" },
        },
        ">+0.05",
      );

      // devir: gerçek kare oldu → anasayfa gelir. overlay erir, altta temiz
      // hero (IntroSec) kalır; solid kare aynı yerde video karesine devreder
      tl.to(
        overlayRef.current,
        { autoAlpha: 0, duration: 0.33, ease: "butter" },
        ">+0.15",
      );
    };

    // Outfit yüklenmeden örnekleme yanlış şekil verir; kaos bu gecikmeyi örter
    if (document.fonts?.load) {
      document.fonts.load('600 100px "Outfit"').then(begin).catch(begin);
    } else {
      begin();
    }

    return () => {
      gsap.ticker.remove(draw);
      if (tl) tl.kill();
      document.body.style.overflow = prevBody;
      document.documentElement.style.overflow = prevHtml;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.overlay} ref={overlayRef} aria-hidden="true">
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}
