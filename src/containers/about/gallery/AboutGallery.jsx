import styles from "./style.module.css"

export default function AboutGallery() {
    return (
        <div className={styles.container}>
            <img
                style={{ aspectRatio: 9 / 16 }}
                className={styles.image}
                src="/assets/images/me/0.webp"
                alt="yunus emre korkmaz"
            />
            <img
                style={{ aspectRatio: 9 / 16 }}
                className={styles.image}
                src="/assets/images/me/1.webp"
                alt="yunus emre korkmaz"
            />
            <img
                style={{ aspectRatio: 9 / 16 }}
                className={styles.image}
                src="/assets/images/me/2.webp"
                alt="yunus emre korkmaz"
            />
            <img
                style={{ aspectRatio: 9 / 16 }}
                className={styles.image}
                src="/assets/images/me/4.webp"
                alt="yunus emre korkmaz"
            />
            <img
                style={{ aspectRatio: 9 / 16 }}
                className={styles.image}
                src="/assets/images/me/7.webp"
                alt="yunus emre korkmaz"
            />
            <img
                style={{ aspectRatio: 16 / 9 }}
                className={styles.image}
                src="/assets/images/me/8.webp"
                alt="yunus emre korkmaz"
            />
        </div>
    )
}