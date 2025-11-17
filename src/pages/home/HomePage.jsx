import { useState, lazy, Suspense } from 'react';
import styles from './style.module.css';
import IntroSec from '../../containers/home/intro/IntroSec';
import WelcomeSec from './../../containers/home/welcome/WelcomeSec';
import LoadingPage from '../../components/loading/LoadingPage';
const AboutmeHome = lazy(() => import('../../containers/home/aboutme/AboutmeHome'));
const WorksHomePage = lazy(() => import('../../containers/home/works/Works'));
const ContactHomePage = lazy(() => import('../../containers/home/contact/ContactHomePage'));
const SplashScreen = lazy(() => import('./../../animations/start/SplashScreen'));


const HomePage = () => {
	const [isAnimationPlayed, setIsAnimationPlayed] = useState(() => {
		if (typeof window !== 'undefined') {
			return sessionStorage.getItem('animationPlayed') === 'true';
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
			{!isAnimationPlayed && (
				<Suspense fallback={null}>
					<SplashScreen onAnimationComplete={handleAnimationComplete} />
				</Suspense>
			)}
			<IntroSec />
			<WelcomeSec />
			<Suspense fallback={<LoadingPage />} >
				<AboutmeHome />
				<WorksHomePage />
				<ContactHomePage />
			</Suspense>
		</div>
	);
};

export default HomePage;