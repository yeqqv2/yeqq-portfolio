import React from 'react';
import styles from './style.module.css';
import { IntroduceHome } from '../../containers/home/introduce/IntroduceHome';
import WelcomeSec from '../../containers/home/welcome/WelcomeSec';
import AboutmeAbout from '../../containers/about/me/AboutmeAbout';
import ExpAbout from '../../containers/about/exp/ExpAbout';
import ContactHomePage from '../../containers/home/contact/ContactHomePage';
import InterestesAbout from '../../containers/about/interest/InterestesAbout';
import IntroAbout from '../../containers/about/intro/IntroAbout';

const AboutPage = () => {
	return (
		<div className={styles.container}>
			<div className={styles.sec}>
				<IntroAbout />
			</div>
			{/* <WelcomeSec /> */}
			{/* <InterestesAbout /> */}
			{/* <IntroduceHome /> */}
			<AboutmeAbout />
			<ExpAbout />
			<ContactHomePage />
		</div>
	);
};

export default AboutPage;
