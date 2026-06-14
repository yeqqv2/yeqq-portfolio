import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { prefersReducedMotion } from "@/utils/motion";
import styles from "./style.module.css";

gsap.registerPlugin(ScrollTrigger);

/* okuma washı: karakterler düşük mürekkeple görünür durur, scroll ilerledikçe
   soldan sağa tam mürekkebe "okunur" (scrub'a bağlı). manifest'in aboutme
   bölümünden türetildi. metin her zaman görünür — en sağlam, en erişilebilir
   reveal. sayfa başına tek güçlü cümle için. */
export default function ReadWash({
  text,
  children,
  className = "",
  tagName = "p",
  from = 0.22,
  start = "top 75%",
  end = "top 35%",
  ...rest
}) {
  const elRef = useRef(null);
  const content = text != null ? text : children;
  const accessibleText = typeof content === "string" ? content : undefined;

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const split = new SplitType(el, { types: "chars", tagName: "span" });
    const chars = split.chars || [];
    if (!chars.length) return;

    // hareket azaltılmışsa: tam mürekkep, wash yok
    if (prefersReducedMotion()) {
      gsap.set(chars, { opacity: 1 });
      return () => {
        try {
          split.revert();
        } catch (e) {
          // noop
        }
      };
    }

    gsap.set(chars, { opacity: from });
    let settled = false;
    const tween = gsap.to(chars, {
      opacity: 1,
      ease: "none",
      stagger: 0.5,
      scrollTrigger: {
        trigger: el,
        start,
        end,
        scrub: true,
        // güvenlik ağı: end konumu sayfanın kaydırılabilir sınırını aşıyorsa
        // wash asla tamamlanamaz; scrub'ı bırak, metni tam mürekkebe sabitle —
        // soluk yarım kalmasın.
        onRefresh: (self) => {
          if (!settled && self.end > ScrollTrigger.maxScroll(window)) {
            settled = true;
            self.disable();
            gsap.set(chars, { opacity: 1 });
          }
        },
      },
    });

    return () => {
      try {
        tween.scrollTrigger?.kill();
        tween.kill();
        split.revert();
      } catch (e) {
        // noop
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessibleText, from, start, end]);

  return React.createElement(
    tagName,
    {
      ref: elRef,
      className: `${styles.text} ${className}`.trim(),
      "aria-label": rest["aria-label"] ?? accessibleText,
      ...rest,
    },
    content,
  );
}
