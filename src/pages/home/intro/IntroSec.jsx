import { memo, useEffect, useRef, useState } from "react";
import styles from "./style.module.css";
import gsap from "gsap";
import { useTranslation } from "react-i18next";
import { prefersReducedMotion } from "@/utils/motion";

// px/sn cinsinden temel hız ve hover davranışları
const BASE_SPEED = 240; // normal akış (sola)
const FAST_MULT = 3; // sola hover → hızlan
const REVERSE_MULT = -1.4; // sağa hover → geri dön
const SMOOTH = 6; // hız geçişlerinin yumuşaklığı (yüksek = daha hızlı oturur)

const prefersLightVideoLoad = () =>
  prefersReducedMotion() ||
  (typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(max-width: 600px)").matches);

const IntroSec = () => {
  const { t } = useTranslation();
  const text = t("intro.marqueeText");
  const reduceMotion = prefersReducedMotion();
  const lightVideoLoad = prefersLightVideoLoad();

  const containerRef = useRef(null);
  const hoverRef = useRef(null);
  const whiteTrackRef = useRef(null);
  const darkTrackRef = useRef(null);
  const [copies, setCopies] = useState(4);

  // animasyonun değişken durumu (render tetiklemez)
  const anim = useRef({
    pos: 0, // mevcut konum (px)
    vel: BASE_SPEED, // anlık hız
    target: BASE_SPEED, // hedef hız
    wrap: (v) => v, // [-unitW, 0) aralığına saran fonksiyon
  });

  useEffect(() => {
    const white = whiteTrackRef.current;
    const dark = darkTrackRef.current;
    const container = containerRef.current;
    const hover = hoverRef.current;
    if (!white || !dark || !container || !hover) return;

    const setWhite = gsap.quickSetter(white, "x", "px");
    const setDark = gsap.quickSetter(dark, "x", "px");
    const s = anim.current;
    const reduce = prefersReducedMotion();

    // Tek bir "ünite" genişliğini ölç → kusursuz modüler sarma mesafesi
    const measure = () => {
      const unit = white.querySelector("[data-unit]");
      if (!unit) return;
      const unitW = unit.getBoundingClientRect().width;
      if (!unitW) return;
      s.wrap = gsap.utils.wrap(-unitW, 0);
      s.pos = s.wrap(s.pos);
      // konteyneri tek bir üniteyle dolduracak kadar kopya garanti et
      const needed = Math.ceil(container.offsetWidth / unitW) + 2;
      setCopies((c) => (needed > c ? needed : c));
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(container);

    // Hareketi azalt tercihinde marquee statik kalsın: kayma da yok, hover hızlanması da.
    if (reduce) {
      setWhite(s.pos);
      setDark(s.pos);
      return () => ro.disconnect();
    }

    // Tek konum kaynağı → iki katman her zaman birebir senkron
    const tick = (_time, deltaMS) => {
      const dt = Math.min(deltaMS, 50) / 1000; // sekme değişiminde sıçramayı engelle
      const k = 1 - Math.exp(-dt * SMOOTH); // kare hızından bağımsız yumuşatma
      s.vel += (s.target - s.vel) * k;
      s.pos = s.wrap(s.pos - s.vel * dt); // vel > 0 → sola; modüler sarma = sıfır sıçrama
      setWhite(s.pos);
      setDark(s.pos);
    };

    // Görünürken çalış, görünmezken CPU'yu boşa harcama
    let running = false;
    const start = () => {
      if (!running) {
        running = true;
        gsap.ticker.add(tick);
      }
    };
    const stop = () => {
      if (running) {
        running = false;
        gsap.ticker.remove(tick);
      }
    };
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 }
    );
    io.observe(container);

    // Hover yalnızca marquee şeridinde: sol → hızlan, orta → dur, sağ → geri dön
    const onMove = (e) => {
      const rect = hover.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width; // 0..1
      if (x < 0.34) s.target = BASE_SPEED * FAST_MULT;
      else if (x > 0.66) s.target = BASE_SPEED * REVERSE_MULT;
      else s.target = 0;
    };
    const onLeave = () => {
      s.target = BASE_SPEED;
    };

    hover.addEventListener("mousemove", onMove);
    hover.addEventListener("mouseleave", onLeave);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      hover.removeEventListener("mousemove", onMove);
      hover.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const units = Array.from({ length: copies }, (_, i) => (
    <span key={i} data-unit className={styles.unit}>
      {text}
    </span>
  ));

  return (
    <div className={styles.container} ref={containerRef}>
      <video
        className={styles.vid}
        src="/assets/videos/videoo.webm"
        autoPlay={!reduceMotion}
        loop
        muted
        playsInline
        preload={lightVideoLoad ? "metadata" : "auto"}
        fetchPriority={lightVideoLoad ? "auto" : "high"}
      />

      <div className={styles.marquee_div}>
        <div className={styles.marquee_div_content}>
          <div className={styles.track} ref={whiteTrackRef}>
            {units}
          </div>
        </div>

        <div className={styles.marquee_div_2}>
          <div className={styles.track} ref={darkTrackRef}>
            {units}
          </div>
        </div>

        {/* yalnızca marquee şeridini kaplayan saydam hover bölgesi */}
        <div className={styles.marquee_hover} ref={hoverRef} aria-hidden="true" />
      </div>
    </div>
  );
};

export default memo(IntroSec);
