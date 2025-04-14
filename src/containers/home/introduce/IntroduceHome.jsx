import React from 'react';
import styles from './style.module.css';
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";


const animation = { duration: 10000, easing: (t) => t }

const me = [
	{ img: '/assets/images/me/0.webp' },
	{ img: '/assets/images/me/1.webp' },
	{ img: '/assets/images/me/2.webp' },
	{ img: '/assets/images/me/3.webp' },
	{ img: '/assets/images/me/4.webp' },
	{ img: '/assets/images/me/5.webp' },
	{ img: '/assets/images/me/6.webp' },
	{ img: '/assets/images/me/7.webp' },
	{ img: '/assets/images/me/8.webp' },
	{ img: '/assets/images/me/9.webp' },
	{ img: '/assets/images/me/10.webp' },
	{ img: '/assets/images/me/11.webp' },
];

export const IntroduceHome = () => {
	const [sliderRef] = useKeenSlider({
		loop: true,
		mode: "free-snap",
		drag: true,
		slides: { perView: "auto", spacing: 10 },
		created(s) {
			s.moveToIdx(5, true, animation)
		},
		updated(s) {
			s.moveToIdx(s.track.details.abs + 5, true, animation)
		},
		animationEnded(s) {
			s.moveToIdx(s.track.details.abs + 5, true, animation)
		},
	});

	return (
		<main className={`${styles.main} keen-slider`} ref={sliderRef}>
			{me.map((item, index) => (
				<img style={{ minWidth: '40vh', objectFit: 'cover' }} key={index} className={`${styles.img} keen-slider__slide`} src={item.img} alt="me" />
			))}
		</main>
	);
};
