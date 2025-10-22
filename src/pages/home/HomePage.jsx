import React, { useState, useEffect } from 'react';
import styles from './style.module.css';
// CONTAINERS
import IntroSec from '../../containers/home/intro/IntroSec';
import WelcomeSec from './../../containers/home/welcome/WelcomeSec';
import { IntroduceHome } from '../../containers/home/introduce/IntroduceHome';
import AboutmeHome from '../../containers/home/aboutme/AboutmeHome';
import WorksHomePage from '../../containers/home/works/Works';
import ContactHomePage from '../../containers/home/contact/ContactHomePage';
import SocialHomePage from './../../containers/home/social/SocialHomePage';
// import SplashScreen from './../../animations/start/SplashScreen';
import SplashScreen from './../../animations/splash/SplashScreen';

const HomePage = () => {
	// Animasyonun daha önce oynatılıp oynatılmadığını tutan state.
	// Başlangıçta sessionStorage'ı kontrol ederek ilk değeri alırız.
	const [isAnimationPlayed, setIsAnimationPlayed] = useState(() => {
		// Sunucu tarafında (server-side rendering) window objesi bulunmadığından,
		// bir kontrol ekleyerek hatayı önlüyoruz.
		if (typeof window !== 'undefined') {
			const hasPlayed = sessionStorage.getItem('animationPlayed');
			return hasPlayed === 'true';
		}
		return false;
	});

	// Bu fonksiyon, SplashScreen animasyonu bittiğinde çağrılacak.
	const handleAnimationComplete = () => {
		console.log("Animasyon tamamlandı. Ana içerik gösteriliyor.");
		// Animasyonun bittiğini state'e kaydet
		setIsAnimationPlayed(true);
		// Bu bilgiyi sessionStorage'a kaydet ki sayfa yenilendiğinde hatırlansın.
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
