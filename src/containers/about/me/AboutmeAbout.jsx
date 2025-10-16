import React, { useState } from 'react';
import styles from './style.module.css';
import colors from '../../../utils/colors';

const AboutmeAbout = () => {
	const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
	const [hovered, setHovered] = useState(false);
	const [cursorStyles, setCursorStyles] = useState({
		bg: 'var(--main-color500)',
		color: 'var(--wb950)',
	});

	const handleMouseMove = (e) => {
		setCursorPos({ x: e.clientX, y: e.clientY });
	};

	const handleMouseEnter = () => {
		const randomIndex = Math.floor(Math.random() * colors.length);
		const randomColor = colors[randomIndex];
		setCursorStyles({ bg: randomColor.bg, color: randomColor.color });
		setHovered(true);
	};

	const handleMouseLeave = () => {
		setHovered(false);
	};

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<div className={styles.flex}>
					<div className={`${styles.card} ${styles.card_text}`}>
						My foundation in Electrical-Electronics Engineering at Bursa Uludağ University provided a strong base for analytical problem-solving, which I leveraged to make a deliberate transition into software development and UI/UX design.
					</div>
					<div className={styles.card}>
						{/* <video
							className={styles.vid}
							src="https://videos.pexels.com/video-files/18069165/18069165-uhd_1440_1440_24fps.mp4"
							autoPlay
							preload="auto"
							loop
							muted
							playsInline
						/> */}
						<img
							src="https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3NmV2OHpzMThld2JzazRhZjVseHR3b3lnMXphOGNiZ2NkeG1xaWhtaCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/maPw2mJhdWboDLRovR/giphy.gif"
							alt="gif"
							className={styles.vid}
							loading="lazy"
						/>
					</div>
				</div>
				<div className={styles.flex}>
					<div className={styles.card}>
						{/* <video
							className={styles.vid}
							src="https://videos.pexels.com/video-files/18069234/18069234-uhd_1440_1440_24fps.mp4"
							autoPlay
							preload="auto"
							loop
							muted
							playsInline
						/> */}
						<img
							src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWt5a2xzeHZuYWYzMm1ybmRrenJ0a3loZGJ5M21wMWRnNHYxYnoxMCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/YRzQnWzbn4WIxd3ZYx/giphy.gif"
							alt="gif"
							className={styles.vid}
							loading="lazy"
						/>
					</div>
					<div className={`${styles.card} ${styles.card_text}`}>
						<p className={styles.text}>
							I gained comprehensive product development experience as a Co-Founder, taking smart systems from concept to a functional MVP. This led to impactful roles, where I developed 5+ cross-platform applications for the public sector, as showcased in my {" "}
							<a
								href="/projects"
								onMouseMove={handleMouseMove}
								onMouseEnter={handleMouseEnter}
								onMouseLeave={handleMouseLeave}
								className={styles.link}
							>
								portfolio.
							</a>
							.
						</p>
					</div>
				</div>
			</div>
			<span
				className={styles.customCursor}
				style={{
					left: cursorPos.x,
					top: cursorPos.y,
					display: hovered ? 'flex' : 'none',
					backgroundColor: cursorStyles.bg,
					color: cursorStyles.color,
				}}
			>
				● see all projects
			</span>
		</div>
	);
};

export default AboutmeAbout;
