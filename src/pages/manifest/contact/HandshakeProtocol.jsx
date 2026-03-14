import { useRef } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styles from "./style.module.css";
import PrimerButton from "@/ui/button/PrimerButton";

gsap.registerPlugin(CustomEase);
const hop = CustomEase.create("hop", "0.9, 0, 0.1, 1");

export default function HandshakeProtocol() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const blackoutRef = useRef(null);

  const handleConnect = () => {
    window.scrollTo(0, 0);
    navigate("/contact-me");
  };

  const handleExit = () => {
    // Not: GSAP animasyonu burada yok, buton direkt yönlendiriyor.
    window.scrollTo(0, 0);
    navigate("/");
  };

  return (
    <div className={styles.container}>
      {/* GSAP kullanmıyorsan bu div'i ve ref'i kaldırabilirsin */}
      <div ref={blackoutRef} className={styles.blackout_curtain} />

      <div className={styles.terminal_box}>
        <h2 className={styles.title}>{t("manifesto.protocol.title")}</h2>
        <p className={styles.desc}>{t("manifesto.protocol.desc")}</p>

        <div className={styles.actions}>
          <PrimerButton
            key="connect-button"
            color="var(--blue50)"
            backgroundColor="var(--blue400)"
            onClick={handleConnect}
            buttonText={t("manifesto.protocol.connect")}
          />
          <PrimerButton
            key="exit-button"
            color="var(--wb50)"
            backgroundColor="var(--red500)"
            onClick={handleExit}
            buttonText={t("manifesto.protocol.exit")}
          />
        </div>
      </div>
    </div>
  );
}
