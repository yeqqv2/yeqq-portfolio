import styles from "./style.module.css";

export default function SuccessBox() {
    return (
        <div className={styles.box}>
            <div className={styles.title}>● message sent</div>
            <div className={styles.text}>
                thank you — I’ll get back to you as soon as possible.
            </div>
        </div>
    );
}
