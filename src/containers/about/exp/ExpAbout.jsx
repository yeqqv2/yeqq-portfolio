import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './style.module.css';

gsap.registerPlugin(ScrollTrigger);

const ExpAbout = () => {
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
					trigger: number1Ref.current, // or any parent container
					start: 'top 80%', // adjust as needed
					toggleActions: 'play none none none',
					snap: 1,
				},
				// Snap to whole numbers
				onUpdate: function () {
					// rounding to avoid decimals
					number1Ref.current.innerText = Math.floor(
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
				duration: 0.5,
				scrollTrigger: {
					trigger: number1Ref.current,
					start: 'top 80%',
					invalidateOnRefresh: true,
					toggleActions: 'play none none none',
					snap: 1,
				},

				onUpdate: function () {
					number2Ref.current.innerText = Math.floor(
						this.targets()[0].innerText
					);
				},
			}
		);
	}, []);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.title}>(tecrübe)</div>
				<div className={styles.desc}>
					her zaman kullanıcı odaklı, estetik ve işlevsel çözümler üretmeye
					odaklanıyorum. kişiye / firmaya özel tasarımları yapmanın,
					yaratıcılığımı beslediğine inanıyorum.
				</div>
			</div>
			<div className={styles.main}>
				<div className={styles.card}>
					<div className={styles.card_header}>
						<span className={styles.plus}>+</span>
						<p className={styles.number} ref={number1Ref}>
							10
						</p>
					</div>
					<div className={styles.card_footer}>(toplam proje)</div>
				</div>
				<div className={styles.card}>
					<div className={styles.card_header}>
						<span className={styles.plus}>+</span>
						<p className={styles.number} ref={number2Ref}>
							2
						</p>
					</div>
					<div className={styles.card_footer}>(yıllık tecrübe)</div>
				</div>
			</div>
		</div>
	);
};

export default ExpAbout;
