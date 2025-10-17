import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import styles from './style.module.css';

const AboutmeHome = () => {
	// cursor position + hover state
	const [hoveringLogo, setHoveringLogo] = useState(false);
	const [logoSrc, setLogoSrc] = useState(null);

	const cursorImgRef = useRef(null);
	const containerRef = useRef(null);

	// quickSetter references
	const posXSetter = useRef(null);
	const posYSetter = useRef(null);

	useEffect(() => {
		// init: make sure element exists
		if (!cursorImgRef.current) return;

		// Use GSAP to manage transforms (x/y/xPercent/yPercent) so transform is unified.
		// Set initial transform state: offscreen + centered via xPercent/yPercent
		gsap.set(cursorImgRef.current, {
			x: -9999,
			y: -9999,
			xPercent: -50,
			yPercent: -50,
			scale: 0.6,
			willChange: 'transform',
			pointerEvents: 'none',
		});

		// quickSetter is very cheap and ideal for pointer follow
		posXSetter.current = gsap.quickSetter(cursorImgRef.current, 'x', 'px');
		posYSetter.current = gsap.quickSetter(cursorImgRef.current, 'y', 'px');
	}, []);

	// scale animation when hovering / leaving
	useEffect(() => {
		if (!cursorImgRef.current) return;
		if (hoveringLogo) {
			gsap.to(cursorImgRef.current, { scale: 1, duration: 0.18, ease: 'power2.out' });
		} else {
			gsap.to(cursorImgRef.current, { scale: 0.6, duration: 0.18, ease: 'power2.out' });
		}
	}, [hoveringLogo]);

	// pointer move handler uses quickSetter for smooth, cheap updates
	const handleMouseMove = (e) => {
		if (posXSetter.current && posYSetter.current) {
			posXSetter.current(e.clientX);
			posYSetter.current(e.clientY);
		} else {
			// fallback: direct style px (shouldn't be necessary)
			if (cursorImgRef.current) {
				cursorImgRef.current.style.left = `${e.clientX}px`;
				cursorImgRef.current.style.top = `${e.clientY}px`;
			}
		}
	};

	// helpers to set which logo to show
	const showLogo = (src) => {
		setLogoSrc(src);
		setHoveringLogo(true);
	};
	const hideLogo = () => {
		setHoveringLogo(false);
	};

	// mapping for spans -> logo paths
	const logos = {
		html: '/assets/svg/html.svg',
		css: '/assets/svg/css.svg',
		sass: '/assets/svg/sass.svg',
		js: '/assets/svg/javascript.svg',
		react: '/assets/svg/react.svg',
		expo: '/assets/svg/expo.svg',
	};

	return (
		<div
			className={styles.container}
			ref={containerRef}
			onMouseMove={handleMouseMove}
			style={{ cursor: hoveringLogo ? 'none' : 'auto' }}
		>
			<header className={styles.header}>[aboutme]</header>

			<main className={styles.main}>
				i architect scalable, human-focused applications using{' '}
				<span
					onMouseEnter={() => showLogo(logos.js)}
					onMouseLeave={hideLogo}
					className={`${styles.svg_name} ${styles.js}`}
				>
					Javascript
				</span>
				, and leverage frameworks like{' '}
				<span
					onMouseEnter={() => showLogo(logos.react)}
					onMouseLeave={hideLogo}
					className={`${styles.svg_name} ${styles.react}`}
				>
					React
				</span>
				{' '}and{' '}
				<span
					onMouseEnter={() => showLogo(logos.expo)}
					onMouseLeave={hideLogo}
					className={`${styles.svg_name} ${styles.reactnative}`}
				>
					React Native (Expo)
				</span>
				{' '}to bring exceptional, responsive interfaces to life across all platforms.
			</main>

			<img
				ref={cursorImgRef}
				src={logoSrc || logos.js}
				alt=""
				aria-hidden="true"
				style={{
					position: 'fixed',
					left: 0,
					top: 0,
					width: 256,
					height: 256,
					display: hoveringLogo ? 'block' : 'none',
					zIndex: 9999,
				}}
			/>

			<footer className={styles.footer}>
				<a className={styles.contact_link_colored} href="/about-me">
					● more about me
				</a>
			</footer>
		</div>
	);
};

export default AboutmeHome;