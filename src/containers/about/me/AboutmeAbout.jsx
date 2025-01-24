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
						bursa uludağ üniversitesi, elektrik-elektronik mühendisliği okurken
						yazılıma ilgi duymaya başladım ve bu ilgimin üzerine düştüm.
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
							23 yaşında ilk şirketimi kurarak yazılım geliştiricisi olarak
							birçok tecrübe kazandım. bu tecrübelerim sayesinde
							<a
								href="/projects"
								onMouseMove={handleMouseMove}
								onMouseEnter={handleMouseEnter}
								onMouseLeave={handleMouseLeave}
								className={styles.link}
							>
								birçok farklı projede
							</a>{' '}
							çalışma fırsatı buldum.
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
				● daha fazlasını gör
			</span>
		</div>
	);
};

export default AboutmeAbout;
