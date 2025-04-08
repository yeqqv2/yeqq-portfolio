import React from 'react';
import styles from './style.module.css';
import { IntroduceHome } from '../../containers/home/introduce/IntroduceHome';
import WelcomeSec from '../../containers/home/welcome/WelcomeSec';
import AboutmeAbout from '../../containers/about/me/AboutmeAbout';
import ExpAbout from '../../containers/about/exp/ExpAbout';
import ContactHomePage from '../../containers/home/contact/ContactHomePage';
import InterestesAbout from '../../containers/about/interest/InterestesAbout';

const AboutPage = () => {
	return (
		<div className={styles.container}>
			<IntroduceHome />
			<WelcomeSec />
			<InterestesAbout />
			<AboutmeAbout />
			<ExpAbout />
			<ContactHomePage />
		</div>
	);
};

export default AboutPage;
