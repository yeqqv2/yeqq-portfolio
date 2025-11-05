import { useState } from 'react';
import styles from './style.module.css';
import IntroSec from '../../containers/home/intro/IntroSec';
import WelcomeSec from './../../containers/home/welcome/WelcomeSec';
import { IntroduceHome } from '../../containers/home/introduce/IntroduceHome';
import AboutmeHome from '../../containers/home/aboutme/AboutmeHome';
import WorksHomePage from '../../containers/home/works/Works';
import ContactHomePage from '../../containers/home/contact/ContactHomePage';
import SocialHomePage from './../../containers/home/social/SocialHomePage';
import SplashScreen from './../../animations/start/SplashScreen';

const HomePage = () => {
	const [isAnimationPlayed, setIsAnimationPlayed] = useState(() => {
		if (typeof window !== 'undefined') {
			const hasPlayed = sessionStorage.getItem('animationPlayed');
			return hasPlayed === 'true';
		}
		return false;
	});

	const handleAnimationComplete = () => {
		setIsAnimationPlayed(true);
		if (typeof window !== 'undefined') {
			sessionStorage.setItem('animationPlayed', 'true');
		}
	};


	return (
		<div className={styles.container}>
			{!isAnimationPlayed ? (
				<SplashScreen onAnimationComplete={handleAnimationComplete} />
			) : (
				null
			)}
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
