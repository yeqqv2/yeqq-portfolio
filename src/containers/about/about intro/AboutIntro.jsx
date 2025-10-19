import styles from "./style.module.css"
import works from '../../../utils/works';

export default function AboutIntro() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.header_title}>
                    [who,am,i]
                </div>
                <div className={styles.header_desc}>
                    i combine design and code to build things people love to use.
                </div>
            </header>
            <div className={styles.content}>
                <a href="/projects" className={styles.card}>
                    <video
                        className={styles.banner}
                        src={works[4].banner}
                        autoPlay
                        loop
                        muted
                        playsInline
                        poster="/assets/loader/video-placeholder.webp"
                        preload="metadata"
                        aria-describedby={works[0].name}
                    />
                </a>
                <a href="/projects" className={styles.card}>
                    <video
                        className={styles.banner}
                        src={works[1].banner}
                        autoPlay
                        loop
                        muted
                        playsInline
                        poster="/assets/loader/video-placeholder.webp"
                        preload="metadata"
                        aria-describedby={works[0].name}
                    />
                </a>
                <a href="/projects" className={styles.card}>
                    <video
                        className={styles.banner}
                        src={works[0].banner}
                        autoPlay
                        loop
                        muted
                        playsInline
                        poster="/assets/loader/video-placeholder.webp"
                        preload="metadata"
                        aria-describedby={works[0].name}
                    />
                </a>
            </div>
        </div>
    )
}