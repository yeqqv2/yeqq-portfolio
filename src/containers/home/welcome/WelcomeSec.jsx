import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger, TextPlugin } from 'gsap/all';
import styles from './style.module.css';
import colors from '../../../utils/colors';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const WelcomeSec = () => {
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

	// Hedef container ref'i
	const nameRef = useRef(null);

	useEffect(() => {
		gsap.to(nameRef.current, {
			scrollTrigger: {
				trigger: nameRef.current,
				start: 'top 60%',
				scrub: false,
			},
			duration: 1.5,
			ease: 'power1.inOut',
			fontWeight: 500,
		});
	}, []);

	return (
		<section className={styles.container}>
			<div className={styles.content}>
				hey, i'm yunus emre korkmaz. i’m a frontend developer who transforms ideas into stunning, human-focused realities.
				here's more about <a
					href="/about-me"
					onMouseMove={handleMouseMove}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
					className={styles.link}
				>
					my story
				</a>
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
				● know everything about me
			</span>
		</section>
	);
};

export default WelcomeSec;
