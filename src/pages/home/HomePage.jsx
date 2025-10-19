import React from 'react';
import styles from './style.module.css';
// CONTAINERS
import IntroSec from '../../containers/home/intro/IntroSec';
import WelcomeSec from './../../containers/home/welcome/WelcomeSec';
import { IntroduceHome } from '../../containers/home/introduce/IntroduceHome';
import AboutmeHome from '../../containers/home/aboutme/AboutmeHome';
import WorksHomePage from '../../containers/home/works/Works';
import ContactHomePage from '../../containers/home/contact/ContactHomePage';
import SocialHomePage from './../../containers/home/social/SocialHomePage';
// import SplashScreen from '../../animations/splash/SplashScreen';
import SplashScreen from './../../animations/start/SplashScreen';

const HomePage = () => {
	return (
		<div className={styles.container}>
			<SplashScreen />
			<IntroSec />
			<WelcomeSec />
			<IntroduceHome />
			<AboutmeHome />
			<WorksHomePage />
			<ContactHomePage />
			<SocialHomePage />
		</div>
	);
};

export default HomePage;
