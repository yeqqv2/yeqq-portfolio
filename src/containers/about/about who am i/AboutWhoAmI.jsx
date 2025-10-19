import styles from "./style.module.css"
import works from '../../../utils/works';

export default function AboutWhoAmI() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.header_title}>
                    [who,am,i]
                </div>
                <div className={styles.header_desc}>
                    yunus emre, 26-years-old. i'm based in istanbul. i spend a lot of time creating things, but life isn't just about the screen...
                </div>
            </header>
        </div>
    )
}