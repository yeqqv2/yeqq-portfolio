import React, { useState, useRef, useCallback } from 'react';
import styles from './style.module.css';
import gsap from 'gsap';
import { throttle } from 'lodash';

const ContactHomePage = ({
	contextText,
	contactMePrefix,
	contactMeSpan,
	contactMeSuffix,
	sentencesData = [],
}) => {
	const [words, setWords] = useState([]);
	const contextRef = useRef(null);
	const wordIndexRef = useRef(0); // Mevcut kelime indeksini takip eder
	const styleIndexRef = useRef(0); // Mevcut stil indeksini takip eder

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

	const handleMouseMove = useCallback(
		throttle((e) => {
			// Eğer cümleler henüz yüklenmediyse hiçbir şey yapma.
			if (!sentencesData || sentencesData.length === 0) return;

			const context = contextRef.current;
			if (!context) return;

			const rect = context.getBoundingClientRect();
			let x = e.clientX - rect.left;
			let y = e.clientY - rect.top;

			x += Math.random() * 20 - 10;
			y += Math.random() * 20 - 10;

			// Eğer tüm kelimeler gösterildiyse, indeksi sıfırla
			if (wordIndexRef.current >= sentencesData.length) {
				wordIndexRef.current = 0;
			}

			const word = sentencesData[wordIndexRef.current];
			wordIndexRef.current += 1;

			// Stili sıralı olarak seç
			const style = stylesArray[styleIndexRef.current];
			styleIndexRef.current += 1;
			if (styleIndexRef.current >= stylesArray.length) {
				styleIndexRef.current = 0; // Stil dizisinin sonuna gelindiyse sıfırla
			}

			const newWord = {
				id: `${Date.now()}-${Math.floor(Math.random() * 100000)}`,
				x,
				y,
				word,
				style, // Sırayla seçilen stil
			};

			setWords((prev) => [...prev, newWord]);

			setTimeout(() => {
				gsap.fromTo(
					`.word-${newWord.id}`,
					{ opacity: 0, y: 0, scale: 1 },
					{ opacity: 1, duration: 0 }
				);
				gsap.to(`.word-${newWord.id}`, {
					scale: 1.25,
					duration: 1.5,
					ease: 'power1.out',
					onComplete: () => {
						gsap.to(`.word-${newWord.id}`, {
							opacity: 0,
							duration: 0.25,
							delay: 1.5,
							ease: 'power1.out',
							onComplete: () => {
								setWords((prev) => prev.filter((w) => w.id !== newWord.id));
							},
						});
					},
				});
			}, 0);
		}, 100),
		[sentencesData] // sentencesData değişince fonksiyon güncellensin
	);

	return (
		<a href="/contact-me" className={styles.container}>
			<div
				className={styles.context}
				ref={contextRef}
				onMouseMove={handleMouseMove}
			>
				<div className={styles.context_text}>{contextText}</div>
				<div className={styles.contact_me}>
					{contactMePrefix}(
					<span className={styles.contact}>{contactMeSpan}</span>)
					{contactMeSuffix}
				</div>
				<div className={styles.sentences}>
					{words.map((item) => (
						<span
							key={item.id}
							className={`word-${item.id} ${item.style}`}
							style={{
								position: 'absolute',
								left: item.x,
								top: item.y,
								pointerEvents: 'none',
								opacity: 0, // Başlangıçta görünmez
							}}
						>
							● {item.word}
						</span>
					))}
				</div>
			</div>
		</a>
	);
};

export default ContactHomePage;
