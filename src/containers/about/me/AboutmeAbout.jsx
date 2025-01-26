import React, { useState } from 'react';
import styles from './style.module.css';
import colors from '../../../utils/colors';
import { useNavigate } from 'react-router-dom';

const AboutmeAbout = () => {
	const navigate = useNavigate();
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
						while studying electrical-electronics engineering at Bursa Uludağ
						University, I developed an interest in software and pursued it
						deeply.
					</div>
					<div className={styles.card}>
						<video
							className={styles.vid}
							src="https://videos.pexels.com/video-files/18069830/18069830-uhd_2560_1440_24fps.mp4"
							autoPlay
							preload="auto"
							loop
							muted
							playsInline
						/>
					</div>
				</div>
				<div className={styles.flex}>
					<div className={styles.card}>
						<video
							className={styles.vid}
							src="https://videos.pexels.com/video-files/18069165/18069165-uhd_1440_1440_24fps.mp4"
							autoPlay
							preload="auto"
							loop
							muted
							playsInline
						/>
					</div>
					<div className={`${styles.card} ${styles.card_text}`}>
						<p className={styles.text}>
							when I was 23, I started my first company as a software developer,
							gaining a wealth of experience. thanks to this, i’ve had the
							opportunity to work on
							<a
								href="/projects"
								onMouseMove={handleMouseMove}
								onMouseEnter={handleMouseEnter}
								onMouseLeave={handleMouseLeave}
								className={styles.link}
							>
								many different projects
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
