/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useCallback } from 'react';
import styles from './style.module.css';
import gsap from 'gsap';
import { throttle } from 'lodash-es';
import { useTranslation } from 'react-i18next';

const ContactHomePage = () => {
	const { t } = useTranslation();
	const [words, setWords] = useState([]);
	const contextRef = useRef(null);
	const wordIndexRef = useRef(0); // Mevcut kelime indeksini takip eder
	const styleIndexRef = useRef(0); // Mevcut stil indeksini takip eder
	const lastSpawnRef = useRef(null); // Son spawn koordinatlarını saklar

	const sentencesData = t('contactHome.sentences', { returnObjects: true });

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

	const minimumDistance = 50;

	const handleMouseMove = useCallback(
		throttle((e) => {
			const context = contextRef.current;
			if (!context) return;

			const rect = context.getBoundingClientRect();
			let x = e.clientX - rect.left;
			let y = e.clientY - rect.top;

			x += Math.random() * 4 - 2;
			y += Math.random() * 4 - 2;

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
				tl.set(`.word-${newWord.id}`, {
					scale: 0,
					force3D: true // Safari için kritik
				})
					.to(`.word-${newWord.id}`, {
						duration: 0.33,
						scale: 1.25,
						ease: 'expo',
						rotate: Math.floor(Math.random() * 20 - 10),
						force3D: true
					})
					.to(`.word-${newWord.id}`, {
						duration: 0.42,
						scale: 0,
						ease: 'expo.in',
						delay: 0.25,
						force3D: true
					});
			}, 10);
		}, 10),
		[sentencesData]
	);

	return (
		<div className={styles.container}>
			<div
				className={styles.context}
				ref={contextRef}
				onMouseMove={handleMouseMove}
			>
				<div className={styles.context_div}>
					<div className={styles.context_header}>
						<div className={styles.context_text}>
							{t('contactHome.header')}
						</div>
						<div className={styles.contact_me}>
							{t('contactHome.subtext')}
						</div>
					</div>
					<a href="/contact-me" className={styles.contact_link_colored}>{t('contactHome.link')}</a>
				</div>
				<div className={styles.sentences}>
					{words.map((word) => (
						<span
							key={word.id}
							className={`word-${word.id} ${word.style}`}
							style={{
								position: 'absolute',
								left: word.x,
								top: word.y,
								display: 'inline-block', // Bunu ekle
								pointerEvents: 'none',
								zIndex: 9999,
								willChange: 'transform', // Safari'ye GPU hazırlığı yaptırır
							}}
						>
							{word.word}
						</span>
					))}
				</div>
			</div>
		</div>
	);
};

export default ContactHomePage;
