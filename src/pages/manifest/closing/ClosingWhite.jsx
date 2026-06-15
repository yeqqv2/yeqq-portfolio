import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { prefersReducedMotion } from "@/utils/motion";
import styles from "./style.module.css";
import PrimerLink from "@/ui/link/PrimerLink";
import LineReveal from "@/components/reveal/LineReveal";

/* beyaza dönüş — manifestonun kapanışı. ilk panel "beyazın ağırlığı" ile
   açılan sayfa, 7 fikrin beyaza soyulup geriye tek satır ve [yeqq] imzasının
   kaldığı bir koda ile döngüyü kapatır. dil diğer panellerle aynı: wb50 zemin,
   hairline, hop ease, maskeden yükselen metin. son satır LineReveal'a aittir
   (kendi scrolltrigger'ı + güvenlik ağı); izler ve imza panel oturunca oynar. */
export default function ClosingWhite({ isActive = true }) {
  const { t } = useTranslation();
  const threadRefs = useRef([]);
  const signatureRef = useRef(null);

  // söylenen 7 fikir, sırasıyla — kapanış bunların beyaza soyuluşudur
  const threads = (t("manifesto.nav", { returnObjects: true }) || []).slice(
    0,
    7,
  );

  useEffect(() => {
    const threadEls = threadRefs.current.filter(Boolean);
    const sig = signatureRef.current;
    if (!threadEls.length || !sig) return;

    // son hal: izler hayalet kalır (loss panelinin hayalet çizgisi gibi),
    // imza görünür. satırın reveal'ı LineReveal'da, isActive'den bağımsız.
    if (prefersReducedMotion()) {
      gsap.set(threadEls, { opacity: 0.06, y: 0 });
      gsap.set(sig, { autoAlpha: 1, y: 0 });
      return undefined;
    }

    // panel pasifken başa sar: geri dönüşte reveal yeniden oynasın
    if (!isActive) {
      gsap.set(threadEls, { opacity: 0.18, y: 0 });
      gsap.set(sig, { autoAlpha: 0, y: 10 });
      return undefined;
    }

    const tl = gsap.timeline();

    // izler beyaza soyulur — eksiltme görünür olur, geriye hayalet iz kalır
    tl.to(threadEls, {
      opacity: 0.06,
      y: -6,
      delay: 0.5,
      duration: 1.2,
      ease: "hop",
      stagger: 0.05,
    });

    // imza belirir — entropi panelinde kaostan dizilen wordmark, sonda mühür
    tl.fromTo(
      sig,
      { autoAlpha: 0, y: 10 },
      { autoAlpha: 1, y: 0, duration: 0.7, ease: "power2.out" },
      "-=0.2",
    );

    return () => tl.kill();
  }, [isActive]);

  return (
    <div className={styles.container}>
      <div className={styles.threads} aria-hidden="true">
        {threads.map((label, i) => (
          <span
            key={i}
            ref={(el) => (threadRefs.current[i] = el)}
            className={styles.thread}
          >
            {label}
          </span>
        ))}
      </div>

      <LineReveal
        key={t("manifesto.closing.line")}
        text={t("manifesto.closing.line")}
        className={styles.line}
        tagName="p"
        start="top 80%"
      />

      <span ref={signatureRef} className={styles.signature}>
        [yeqq]
      </span>
      <PrimerLink
        href="/contact-me"
        buttonText={t("manifesto.closing.door")}
        random
      />
    </div>
  );
}
