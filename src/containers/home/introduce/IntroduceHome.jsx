import React, { useRef, useEffect } from 'react';
import styles from './style.module.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
];

const settings = {
	dots: false,
	className: styles.slider,
	centerMode: true,
	infinite: true,
	variableWidth: true,
	slidesToShow: 1,
	slidesToScroll: 1,
	autoplay: true,
	speed: 2000,
	autoplaySpeed: 2000,
	pauseOnHover: true,
	swipeToSlide: true,
	rtl: true,
};

export const IntroduceHome = () => {
	const sliderRef = useRef(null);

	// Pencere yeniden boyutlandırıldığında slider'ı güncelle
	useEffect(() => {
		const handleResize = () => {
			if (sliderRef.current && sliderRef.current.innerSlider) {
				sliderRef.current.innerSlider.onWindowResized();
			}
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return (
		<div className={styles.container}>
			<main className={styles.main}>
				<Slider ref={sliderRef} {...settings}>
					{me.map((item, index) => (
						// VariableWidth kullanıldığından her slayta genişlik tanımlaması ekleyin.
						<div className={styles.card} key={index}>
							<img className={styles.img} src={item.img} alt="me" />
						</div>
					))}
				</Slider>
			</main>
		</div>
	);
};
