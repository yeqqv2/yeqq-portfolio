import AnimatedSplit from "../../components/animated split/AnimatedSplit";
import styles from "./style.module.css";
import { useTranslation } from "react-i18next";

export default function PrinciplesSection() {
    const { t } = useTranslation();
    const principles = t('principles.list', { returnObjects: true });

    return (
        <section className={styles.container}>
            <AnimatedSplit
            key={t('principles.title')} // Dil değişince animasyonu yenile
                text={t('principles.title')}
                className={styles.title}
                tagName="span"
                stagger={0.03}
                duration={1.5}
                start="top 80%"
            />
            <div className={styles.items}>
                {Array.isArray(principles) && principles.map((p, i) => (
                    <AnimatedSplit
                        key={`${p}-${i}`} // Her madde için benzersiz key
                        text={p}
                        className={styles.item}
                        tagName="span"
                        stagger={0.03}
                        duration={1.5}
                        start="top 80%"
                    />
                ))}
            </div>
        </section>
    );
}
