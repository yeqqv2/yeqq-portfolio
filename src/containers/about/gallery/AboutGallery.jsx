import styles from "./style.module.css"

export default function AboutGallery() {
    return (
        <div className={styles.container}>
            <img
                className={styles.image}
                src="/assets/images/me/1.webp"
                alt="yunus emre korkmaz"
                aria-hidden="true"
                loading="lazy"
                decoding="async"
            />
            <img
                className={styles.image}
                src="/assets/images/me/2.webp"
                alt="yunus emre korkmaz"
                aria-hidden="true"
                loading="lazy"
                decoding="async"
            />
            <img
                className={styles.image}
                src="/assets/images/me/4.webp"
                alt="yunus emre korkmaz"
                aria-hidden="true"
                loading="lazy"
                decoding="async"
            />
            <img
                className={styles.image}
                src="/assets/images/me/8.webp"
                alt="yunus emre korkmaz"
                aria-hidden="true"
                loading="lazy"
                decoding="async"
            />
            <img
                className={styles.image}
                src="/assets/images/me/3.webp"
                alt="yunus emre korkmaz"
                aria-hidden="true"
                loading="lazy"
                decoding="async"
            />
        </div>
    )
}