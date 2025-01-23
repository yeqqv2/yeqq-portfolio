import React from 'react';
import './style.css';

const generateRandomValue = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

const StaryNight = () => {
	const stars = Array.from({ length: 50 }).map((_, index) => {
		const randomTop = generateRandomValue(0, 100); // % cinsinden top
		const randomLength = generateRandomValue(500, 750) / 100; // em cinsinden uzunluk
		const randomDuration = generateRandomValue(6000, 12000) / 1000; // saniye cinsinden süre
		const randomDelay = generateRandomValue(0, 10000) / 1000; // saniye cinsinden gecikme

		const starStyle = {
			'--top-offset': `${randomTop}vh`,
			'--star-tail-length': `${randomLength}em`,
			'--fall-duration': `${randomDuration}s`,
			'--fall-delay': `${randomDelay}s`,
		};

		return <div key={index} className="star" style={starStyle}></div>;
	});

	return (
		<div className="stary-sky">
			<div className="stars">{stars}</div>
		</div>
	);
};

export default StaryNight;
