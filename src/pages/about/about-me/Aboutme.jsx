import styles from "./style.module.css";
import AnimatedSplit from "../../../components/animated split/AnimatedSplit";
// 1. Hook'u import et
import { useTranslation } from 'react-i18next';

export default function Aboutme() {
    // 2. t fonksiyonunu al
    const { t } = useTranslation();

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <AnimatedSplit
                    // 3. Dil değiştiğinde animasyonu tetiklemek için key ekle
                    key={t('aboutmePage.title')}
                    text={t('aboutmePage.title')}
                    className={styles.header_title}
                    tagName="span"
                    stagger={0.03}
                    duration={1.5}
                    start="top 80%"
                />
            </header>
            <div className={styles.context}>
                <AnimatedSplit
                    key={t('aboutmePage.bio_1')}
                    text={t('aboutmePage.bio_1')}
                    className={styles.desc}
                    tagName="span"
                    stagger={0.03}
                    duration={1.5}
                    start="top 80%"
                />
            </div>
            <div className={styles.context}>
                <AnimatedSplit
                    key={t('aboutmePage.bio_2')}
                    text={t('aboutmePage.bio_2')}
                    className={styles.desc}
                    tagName="span"
                    stagger={0.03}
                    duration={1.5}
                    start="top 70%"
                />
            </div>
        </div>
    );
}