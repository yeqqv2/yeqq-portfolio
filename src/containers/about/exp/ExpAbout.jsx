import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './style.module.css';

gsap.registerPlugin(ScrollTrigger);

const ExpAbout = ({
	headerTitle,
	headerDesc,
	cardOneFooter,
	cardTwoFooter,
}) => {
	const number1Ref = useRef(null);
	const number2Ref = useRef(null);

	useEffect(() => {
		// Number 1 (animates from 0 to 10)
		gsap.fromTo(
			number1Ref.current,
			{ innerText: 0 },
			{
				innerText: 10,
				duration: 1,
				scrollTrigger: {
					trigger: number1Ref.current, // Kartın kendisini tetikleme noktası olarak kullan
					start: 'top 80%', // Sayfanın 80% noktasında tetikleme
					toggleActions: 'play none none none',
					invalidateOnRefresh: true,
					snap: { innerText: 1 }, // Tam sayılara yuvarlama
				},
				onUpdate: function () {
					// Rakamları tam sayıya yuvarla ve elemanın içeriğini güncelle
					number1Ref.current.innerText = Math.round(
						this.targets()[0].innerText
					);
				},
			}
		);

		// Number 2 (animates from 0 to 2)
		gsap.fromTo(
			number2Ref.current,
			{ innerText: 0 },
			{
				innerText: 2,
				duration: 1,
				scrollTrigger: {
					trigger: number2Ref.current, // İkinci kart için bağımsız tetikleme
					start: 'top 80%',
					toggleActions: 'play none none none',
					invalidateOnRefresh: true,
					snap: { innerText: 1 },
				},
				onUpdate: function () {
					number2Ref.current.innerText = Math.round(
						this.targets()[0].innerText
					);
				},
			}
		);
	}, []);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.title}>{headerTitle}</div>
				<div className={styles.desc}>{headerDesc}</div>
			</div>
			<div className={styles.main}>
				<div className={styles.card}>
					<div className={styles.card_header}>
						<span className={styles.plus}>+</span>
						<p className={styles.number} ref={number1Ref}>
							0
						</p>
					</div>
					<div className={styles.card_footer}>{cardOneFooter}</div>
				</div>
				<div className={styles.card}>
					<div className={styles.card_header}>
						<span className={styles.plus}>+</span>
						<p className={styles.number} ref={number2Ref}>
							0
						</p>
					</div>
					<div className={styles.card_footer}>{cardTwoFooter}</div>
				</div>
			</div>
		</div>
	);
};

export default ExpAbout;
