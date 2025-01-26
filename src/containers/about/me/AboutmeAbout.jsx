import React, { useState } from 'react';
import styles from './style.module.css';
import colors from '../../../utils/colors';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const AboutmeAbout = () => {
	const { t } = useTranslation();
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
		const randomColor = colors[randomIndex] || {
			bg: 'var(--main-color500)',
			color: 'var(--wb950)',
		};
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
						{t('aboutmeAbout.cardOneText')}
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
							{t('aboutmeAbout.cardTwoPart1')}{' '}
							<a
								href="/projects"
								onMouseMove={handleMouseMove}
								onMouseEnter={handleMouseEnter}
								onMouseLeave={handleMouseLeave}
								className={styles.link}
							>
								{t('aboutmeAbout.cardTwoLink')}
							</a>{' '}
							{t('aboutmeAbout.cardTwoPart2')}
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
				{t('aboutmeAbout.customCursorText')}
			</span>
		</div>
	);
};

export default AboutmeAbout;
