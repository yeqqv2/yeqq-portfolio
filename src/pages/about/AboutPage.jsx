import { useState, useRef, useCallback } from 'react';
import styles from './style.module.css';
import AboutmeAbout from '../../containers/about/me/AboutmeAbout';
import ExpAbout from '../../containers/about/exp/ExpAbout';
import ContactHomePage from '../../containers/home/contact/ContactHomePage';
import IntroAbout from '../../containers/about/intro/IntroAbout';
import AboutIntro from '../../containers/about/about intro/AboutIntro';

import gsap from 'gsap';
import { throttle } from 'lodash';
import AboutWhoAmI from '../../containers/about/about who am i/AboutWhoAmI';
import AboutGallery from '../../containers/about/gallery/AboutGallery';

const AboutPage = () => {
	const [words, setWords] = useState([]);
	const contextRef = useRef(null);
	const wordIndexRef = useRef(0); // Mevcut kelime indeksini takip eder
	const styleIndexRef = useRef(0); // Mevcut stil indeksini takip eder
	const lastSpawnRef = useRef(null); // Son spawn koordinatlarını saklar

	const sentencesData = [
		'hello there',
		'im yunus emre',
		'frontend developer',
		'ui/ux designer',
		'i build things',
		'for the web',
		'and for people',
		'turning ideas',
		'into reality',
	];

	const stylesArray = [
		styles.style1,
		styles.style2,
		styles.style3,
		styles.style4,
		styles.style5,
		styles.style6,
		styles.style7,
		styles.style8,
	];

	const minimumDistance = 150;

	const handleMouseMove = useCallback(
		throttle((e) => {
			const context = contextRef.current;
			if (!context) return;

			const rect = context.getBoundingClientRect();
			let x = e.clientX - rect.left;
			let y = e.clientY - rect.top;

			x += Math.random() * 40 - 20;
			y += Math.random() * 40 - 20;

			if (lastSpawnRef.current) {
				const dx = x - lastSpawnRef.current.x;
				const dy = y - lastSpawnRef.current.y;
				const distance = Math.hypot(dx, dy);
				if (distance < minimumDistance) {
					return;
				}
			}

			if (wordIndexRef.current >= sentencesData.length) {
				wordIndexRef.current = 0;
			}
			const word = sentencesData[wordIndexRef.current];
			wordIndexRef.current += 1;

			const style = stylesArray[styleIndexRef.current];
			styleIndexRef.current += 1;
			if (styleIndexRef.current >= stylesArray.length) {
				styleIndexRef.current = 0;
			}

			const newWord = {
				id: `${Date.now()}-${Math.floor(Math.random() * 100000)}`,
				x,
				y,
				word,
				style,
			};

			setWords((prev) => [...prev, newWord]);

			lastSpawnRef.current = { x, y };

			setTimeout(() => {
				const tl = gsap.timeline({
					onComplete: () => {
						setWords((prev) => prev.filter((word) => word.id !== newWord.id));
					},
				});
				tl.set(`.word-${newWord.id}`, { opacity: 0, scale: 0 })
					.to(`.word-${newWord.id}`, {
						duration: 0.33,
						opacity: 1,
						scale: 3,
						rotate: Math.floor(Math.random() * 20 - 10),
						ease: 'expo.out',
					})
					.to(`.word-${newWord.id}`, {
						duration: 0.3,
						scale: 0,
						ease: 'expo.in',
						delay: 0.25
					});
			}, 0);
		}, 10),
		[]
	);

	return (
		<div
			className={styles.container}
			ref={contextRef}
			onMouseMove={handleMouseMove}
		>
			<IntroAbout />
			<AboutIntro />
			<AboutWhoAmI />
			<AboutGallery />
			<div className={styles.sentences}>
				{words.map((word) => (
					<span
						key={word.id}
						className={`word-${word.id} ${word.style}`}
						style={{
							position: 'absolute',
							left: word.x,
							top: word.y,
							pointerEvents: 'none',
							opacity: 0,
						}}
					>
						● {word.word}
					</span>
				))}
			</div>
		</div>
	);
};

export default AboutPage;
