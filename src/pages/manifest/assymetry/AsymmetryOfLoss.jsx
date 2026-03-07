import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { useTranslation } from "react-i18next";
import PrimerButton from "../../../ui/button/PrimerButton";
import styles from "./style.module.css";

gsap.registerPlugin(CustomEase);
const hop = CustomEase.create("hop", "0.9, 0, 0.1, 1");

export default function AsymmetryOfLoss() {
  const { t } = useTranslation();
  const towerRef = useRef(null);
  const blocksRef = useRef([]);

  // Başlangıçta 5 blok inşa edilmiş olsun, maksimum 9 olabilir.
  const [count, setCount] = useState(5);

  const concepts =
    t("manifesto.asymmetry.concepts", { returnObjects: true }) || [];

  const handleBuild = () => {
    if (count >= 9) return;

    // 1. React DOM'u anında günceller (yeni eleman render edilir)
    flushSync(() => {
      setCount((prev) => prev + 1);
    });

    // 2. Yeni eklenen elemanı yavaşça ve eforla inşa et (Opacity YOK, Kütle VAR)
    const newBlock = blocksRef.current[count];
    gsap.fromTo(
      newBlock,
      { height: 0, scaleY: 0, margin: 0 },
      {
        height: "auto",
        scaleY: 1,
        margin: "2px 0",
        duration: 1.5,
        ease: "power1.out", // İnşa etmek yavaş ve sakindir
      },
    );
  };

  const handleDestruct = () => {
    if (count <= 0) return;

    const topBlock = blocksRef.current[count - 1];

    // 1. En üstteki bloğu acımasızca ezerek yok et (0.1 saniye)
    gsap.to(topBlock, {
      height: 0,
      scaleY: 0,
      margin: 0,
      duration: 0.1,
      ease: hop,
      onComplete: () => {
        // Animasyon bitince DOM'dan tamamen kaldır
        setCount((prev) => prev - 1);
      },
    });

    // 2. TRAVMA ETKİSİ: Kulenin geri kalanı yıkımın ağırlığıyla sarsılır
    gsap.to(towerRef.current, {
      y: 15, // Kule aşağı çöker
      scaleY: 0.95, // Baskıdan ezilir
      duration: 0.15,
      yoyo: true,
      repeat: 1,
      ease: "power4.inOut",
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.interaction_zone}>
        {/* Kontrol Paneli */}
        <div className={styles.controls}>
          <button className={styles.action_btn} onClick={handleBuild}>
            {t("manifesto.asymmetry.build")}
          </button>
          <button className={styles.action_btn} onClick={handleDestruct}>
            {t("manifesto.asymmetry.destruct")}
          </button>
        </div>

        {/* Veri Kulesi */}
        <div ref={towerRef} className={styles.tower}>
          {Array.from({ length: count }).map((_, i) => (
            <div
              key={i}
              ref={(el) => (blocksRef.current[i] = el)}
              className={styles.block_wrapper}
            >
              <PrimerButton
                color="var(--wb50)"
                backgroundColor="var(--wb950)"
                buttonText={concepts[i]}
              />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.annotation}>
        <h4>{t("manifesto.asymmetry.title")}</h4>
        <p>{t("manifesto.asymmetry.desc")}</p>
      </div>
    </div>
  );
}
