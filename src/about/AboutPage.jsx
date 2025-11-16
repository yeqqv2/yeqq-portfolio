import styles from "./style.module.css"
import Aboutme from './about-me/Aboutme'
import Education from './education/Education';
import Experience from "../backstage/experience/Experience";
import Achievements from './achievements/Achievements';
import Backstage from './backstage/Backstage';

export default function AboutPage() {
    return (
        <div className={styles.container}>
            <Aboutme />
            <Education />
            <Experience />
            <Achievements />
            <Backstage />
        </div>
    )
}
