// Home Page
import { useState, lazy, Suspense } from 'react';
// OPENING
import SplashScreen from '../../animations/open/SplashScreen';
// COMPONENTS
import IntroSec from './intro/IntroSec';
import WelcomeSec from './welcome/WelcomeSec';
// LAZY LOADINGS
const About = lazy(() => import('./aboutme/AboutmeHome'));
const Works = lazy(() => import('./works/Works'));
const Principles = lazy(() => import('./principle/PrinciplesSection'));
const Contact = lazy(() => import('./contact/ContactHomePage'));
// LOADING
import LoadingPage from '../../components/loading/LoadingPage';
// MODULE CSS
import styles from './style.module.css';

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
			<Suspense fallback={<LoadingPage />} >
				<WelcomeSec />
				<About />
				<Works />
				<Principles />
				<Contact />
			</Suspense>
		</div>
	);
};

export default HomePage;