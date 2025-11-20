import AnimatedSplit from "../../components/animated split/AnimatedSplit";
import styles from "./style.module.css";


const principles = [
    "clarity over complexity",
    "motion with purpose",
    "design informs engineering",
    "consistency creates trust",
    "details matter, but flow matters more",
];

export default function PrinciplesSection() {

    return (
        <section className={styles.container}>
            <AnimatedSplit
                text={"[principles]"}
                className={styles.title}
                tagName="span"
                stagger={0.03}
                duration={1.5}
                start="top 80%"
            />
            <div className={styles.items}>
                {principles.map((p, i) => (
                    <AnimatedSplit
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
