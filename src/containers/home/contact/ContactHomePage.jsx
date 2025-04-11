import React, { useState, useRef, useCallback } from 'react';
import styles from './style.module.css';
import gsap from 'gsap';
import { throttle } from 'lodash';

const ContactHomePage = () => {
	const [words, setWords] = useState([]);
	const contextRef = useRef(null);
	const wordIndexRef = useRef(0); // Mevcut kelime indeksini takip eder
	const styleIndexRef = useRef(0); // Mevcut stil indeksini takip eder

	const sentencesData = [
		'if you want',
		'develop',
		'a software',
		'this is',
		'your place',
		'do you have',
		'an idea?',
		'your dream',
		'make it happen!',
		'start',
		'your project!',
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

	const handleMouseMove = useCallback(
		throttle((e) => {
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
				style,
			};

			setWords((prev) => [...prev, newWord]);

			setTimeout(() => {
				gsap.fromTo(
					`.word-${newWord.id}`,
					{ y: 0, scale: 0 },
					{ opacity: 1, scale: 1 }
				);
				gsap.to(`.word-${newWord.id}`, {
					scale: 1.25,
					delay: .5,
					duration: 1,
					ease: 'power1.out',
					onComplete: () => {
						gsap.to(`.word-${newWord.id}`, {
							scale: 0,
							duration: .5,
							delay: 1,
							ease: 'expo.out',
							onComplete: () => {
								setWords((prev) =>
									prev.filter((word) => word.id !== newWord.id)
								);
							},
						});
					},
				});
			}, 0);
		}, 60),
		[]
	);

	return (
		<a href="/contact-me" className={styles.container}>
			<div
				className={styles.context}
				ref={contextRef}
				onMouseMove={handleMouseMove}
			>
				<div className={styles.context_text}>
					do you have any software idea?
				</div>
				<div className={styles.contact_me}>
					let's (<span className={styles.contact}>get in touch</span>)
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
								pointerEvents: 'none',
								opacity: 0,
							}}
						>
							● {word.word}
						</span>
					))}
				</div>
			</div>
		</a>
	);
};

export default ContactHomePage;
