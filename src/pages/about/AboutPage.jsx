import React from 'react';
import styles from './style.module.css';
import { IntroduceHome } from '../../containers/home/introduce/IntroduceHome';
import WelcomeSec from '../../containers/home/welcome/WelcomeSec';
import AboutmeAbout from '../../containers/about/me/AboutmeAbout';

const AboutPage = () => {
	return (
		<div className={styles.container}>
			<IntroduceHome />
			<WelcomeSec />
			<AboutmeAbout />
		</div>
	);
};

export default AboutPage;
