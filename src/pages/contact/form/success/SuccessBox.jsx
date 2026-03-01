import styles from "./style.module.css";
// 1. Hook'u import et
import { useTranslation } from 'react-i18next';

export default function SuccessBox() {
    // 2. t fonksiyonunu al
    const { t } = useTranslation();

    return (
        <div className={styles.box}>
            <div className={styles.title}>
                {t('successBox.title')}
            </div>
            <div className={styles.text}>
                {t('successBox.text')}
            </div>
        </div>
    );
}