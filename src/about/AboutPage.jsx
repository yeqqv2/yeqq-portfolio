import styles from "./style.module.css"
import HeroAbout from "./hero/HeroAbout";
import Aboutme from './about-me/Aboutme'
import Techstack from './techstack/Techstack';
import DiscoverMe from './discover/DiscoverMe';
// import Backstage from './backstage/Backstage';
import WhatIDo from "./what-i-do/WhatIDo";
import ContactHomePage from "../containers/home/contact/ContactHomePage";

export default function AboutPage() {
    return (
        <div className={styles.container}>
            <HeroAbout />
            <Aboutme />
            <WhatIDo />
            <Techstack />
            <DiscoverMe />
            {/* <Backstage /> */}
            <ContactHomePage />
        </div>
    )
}
