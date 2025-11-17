import styles from "./style.module.css"
import HeroAbout from "./hero/HeroAbout";
import Aboutme from './about-me/Aboutme'
import Techstack from './techstack/Techstack';
import DiscoverMe from './discover/DiscoverMe';
import Achievements from './achievements/Achievements';
import Backstage from './backstage/Backstage';
import WhatIDo from "./what-i-do/WhatIDo";

export default function AboutPage() {
    return (
        <div className={styles.container}>
            <HeroAbout />
            <Aboutme />
            <WhatIDo />
            <DiscoverMe />
            <Achievements />
            <Techstack />
            <Backstage />
        </div>
    )
}
