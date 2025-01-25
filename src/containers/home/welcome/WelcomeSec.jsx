import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger, TextPlugin } from 'gsap/all';
import styles from './style.module.css';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const WelcomeSec = () => {
	// Hedef container ref'i
	const nameRef = useRef(null);

	useEffect(() => {
		gsap.to(nameRef.current, {
			scrollTrigger: {
				trigger: nameRef.current,
				start: 'top 60%',
				scrub: false,
			},
			duration: 1.5,
			ease: 'power1.inOut',
			fontWeight: 500,
		});
	}, []);

	return (
		<section className={styles.container}>
			<div className={styles.content}>
				merhaba ben yunus emre korkmaz, kullanıcı odaklı ve estetik tasarımlar
				oluşturuyorum.
			</div>
		</section>
	);
};

export default WelcomeSec;
