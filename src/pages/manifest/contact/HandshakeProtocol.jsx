import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styles from "./style.module.css";
import PrimerButton from "@/ui/button/PrimerButton";

export default function HandshakeProtocol() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleConnect = () => {
    window.scrollTo(0, 0);
    navigate("/contact-me");
  };

  return (
    <div className={styles.container}>
      <div className={styles.terminal_box}>
        <h2 className={styles.title}>{t("manifesto.protocol.title")}</h2>
        <p className={styles.desc}>{t("manifesto.protocol.desc")}</p>

        <div className={styles.actions}>
          <PrimerButton
            color="var(--wb50)"
            backgroundColor="var(--wb950)"
            onClick={handleConnect}
            buttonText={t("manifesto.protocol.connect")}
          />
        </div>
      </div>
    </div>
  );
}
