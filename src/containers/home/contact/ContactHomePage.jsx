/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useCallback } from 'react';
import styles from './style.module.css';
import gsap from 'gsap';
import { throttle } from 'lodash';

const ContactHomePage = () => {
	const [words, setWords] = useState([]);
	const contextRef = useRef(null);
	const wordIndexRef = useRef(0); // Mevcut kelime indeksini takip eder
	const styleIndexRef = useRef(0); // Mevcut stil indeksini takip eder
	const lastSpawnRef = useRef(null); // Son spawn koordinatlarını saklar

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

	// Minimum mesafe, örneğin 50 piksel
	const minimumDistance = 60;

	const handleMouseMove = useCallback(
		throttle((e) => {
			const context = contextRef.current;
			if (!context) return;

			const rect = context.getBoundingClientRect();
			let x = e.clientX - rect.left;
			let y = e.clientY - rect.top;

			// Rastgele küçük titreşim efekti için offset
			x += Math.random() * 4 - 2;
			y += Math.random() * 4 - 2;

			// Önceki spawn ile aradaki mesafeyi kontrol et
			if (lastSpawnRef.current) {
				const dx = x - lastSpawnRef.current.x;
				const dy = y - lastSpawnRef.current.y;
				const distance = Math.hypot(dx, dy);
				if (distance < minimumDistance) {
					// Mesafe yeterince büyük değilse yeni kelime oluşturma
					return;
				}
			}

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
				styleIndexRef.current = 0;
			}

			const newWord = {
				id: `${Date.now()}-${Math.floor(Math.random() * 100000)}`,
				x,
				y,
				word,
				style,
			};

			// Yeni kelimeyi state'e ekle
			setWords((prev) => [...prev, newWord]);

			// Yeni spawn edilen konumu kaydet (böylece üst üste binme engellenecek)
			lastSpawnRef.current = { x, y };

			// GSAP animasyon zinciri
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
						scale: 1.25,
						rotate: Math.floor(Math.random() * 20 - 10),
						ease: 'expo.out',
					})
					.to(`.word-${newWord.id}`, {
						duration: 0.42,
						scale: 0,
						ease: 'expo.in',
						delay: 0.25
					});
			}, 0);
		}, 10),
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
					let's [<span className={styles.contact}>get in touch</span>]
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
