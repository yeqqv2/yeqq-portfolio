import styles from "./style.module.css";
import AnimatedSplit from './../../components/animated split/AnimatedSplit';


export default function Aboutme() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <AnimatedSplit
                    text={
                        "[who am i]"
                    }
                    className={styles.header_title}
                    tagName="span"
                    stagger={0.03}
                    duration={1.5}
                    start="top 80%"
                />
            </header>
            <div className={styles.context}>
                <AnimatedSplit
                    text={
                        "i'm yunus emre korkmaz — a hybrid frontend developer & UI/UX designer with experience creating scalable, accessible, and visually refined digital products."
                    }
                    className={styles.desc}
                    tagName="span"
                    stagger={0.03}
                    duration={1.5}
                    start="top 80%"
                />
            </div>
            <div className={styles.context}>
                <AnimatedSplit
                    text={
                        "My work blends engineering precision with design sensitivity, allowing me to build interfaces that are not only functional, but intuitive and enjoyable to use."
                    }
                    className={styles.desc}
                    tagName="span"
                    stagger={0.03}
                    duration={1.5}
                    start="top 80%"
                />
            </div>
        </div>
    );
}