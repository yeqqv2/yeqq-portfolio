import React from 'react';
import styles from './style.module.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const me = [
	{ img: '/assets/images/me/0.jpeg' },
	{ img: '/assets/images/me/7.jpg' },
	{ img: '/assets/images/me/2.jpg' },
	{ img: '/assets/images/me/6.jpeg' },
	{ img: '/assets/images/me/1.jpg' },
	{ img: '/assets/images/me/5.jpg' },
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
	return (
		<div className={styles.container}>
			<main className={styles.main}>
				<Slider {...settings}>
					{me.map((item, index) => (
						<div className={styles.card} key={index}>
							<img className={styles.img} src={item.img} alt="me" />
						</div>
					))}
				</Slider>
			</main>
		</div>
	);
};
