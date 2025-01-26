import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import styles from './style.module.css';

const AboutmeHome = () => {
	// 1. Span’ler (teknoloji isimleri) için referanslar
	const htmlNameRef = useRef(null);
	const cssNameRef = useRef(null);
	const sassNameRef = useRef(null);
	const jsNameRef = useRef(null);
	const reactNameRef = useRef(null);
	const vueNameRef = useRef(null);

	// 2. İlgili SVG’ler için referanslar
	const htmlRef = useRef(null);
	const cssRef = useRef(null);
	const sassRef = useRef(null);
	const jsRef = useRef(null);
	const reactRef = useRef(null);
	const vueRef = useRef(null);

	// 3. Bileşen yüklendiğinde Event Listener’ları tanımla
	useEffect(() => {
		// Tüm “isim” & “svg” eşleşmelerini dizi şeklinde tutalım
		const techRefs = [
			{ nameRef: htmlNameRef, svgRef: htmlRef },
			{ nameRef: cssNameRef, svgRef: cssRef },
			{ nameRef: sassNameRef, svgRef: sassRef },
			{ nameRef: jsNameRef, svgRef: jsRef },
			{ nameRef: reactNameRef, svgRef: reactRef },
			{ nameRef: vueNameRef, svgRef: vueRef },
		];

		techRefs.forEach(({ nameRef, svgRef }) => {
			if (!nameRef.current || !svgRef.current) return;

			// Hover (mouseenter) olduğunda SVG’yi sağa kaydır
			const onEnter = () => {
				gsap.to(svgRef.current, {
					duration: 0.5,
					right: 0,
					ease: 'power2.out',
				});
			};

			// Mouse ayrıldığında (mouseleave) SVG’yi geri çek
			const onLeave = () => {
				gsap.to(svgRef.current, {
					duration: 0.5,
					right: '-100%', // Başlangıç pozisyonunuza geri
					ease: 'power2.in',
				});
			};

			nameRef.current.addEventListener('mouseenter', onEnter);
			nameRef.current.addEventListener('mouseleave', onLeave);

			// Cleanup: Bileşen unmount olurken event’leri temizle
			return () => {
				nameRef.current.removeEventListener('mouseenter', onEnter);
				nameRef.current.removeEventListener('mouseleave', onLeave);
			};
		});
	}, []);

	return (
		<div className={styles.container}>
			<header className={styles.header}>(hakkımda)</header>
			<main className={styles.main}>
				as a frontend developer, I view every project I design and code as a
				piece of art.{' '}
				<span ref={htmlNameRef} className={`${styles.svg_name} ${styles.html}`}>
					HTML
				</span>
				,{' '}
				<span ref={cssNameRef} className={`${styles.svg_name} ${styles.css}`}>
					CSS
				</span>{' '}
				&{' '}
				<span ref={sassNameRef} className={`${styles.svg_name} ${styles.sass}`}>
					SASS
				</span>{' '}
				and{' '}
				<span ref={jsNameRef} className={`${styles.svg_name} ${styles.js}`}>
					Javascript
				</span>{' '}
				primarily among modern web technologies, and{' '}
				<span
					ref={reactNameRef}
					className={`${styles.svg_name} ${styles.react}`}
				>
					React
				</span>
				,{' '}
				<span ref={vueNameRef} className={`${styles.svg_name} ${styles.vue}`}>
					Vue
				</span>{' '}
				are some libraries I use to develop dynamic projects.
			</main>

			{/* SVG’ler - başlangıçta gizli konumda duracaklar */}
			<img
				ref={htmlRef}
				className={styles.svg}
				src="/assets/svg/html.svg"
				alt="HTML"
			/>
			<img
				ref={cssRef}
				className={styles.svg}
				src="/assets/svg/css.svg"
				alt="CSS"
			/>
			<img
				ref={sassRef}
				className={styles.svg}
				src="/assets/svg/sass.svg"
				alt="SASS"
			/>
			<img
				ref={jsRef}
				className={styles.svg}
				src="/assets/svg/javascript.svg"
				alt="Javascript"
			/>
			<img
				ref={reactRef}
				className={styles.svg}
				src="/assets/svg/react.svg"
				alt="React.js"
			/>
			<img
				ref={vueRef}
				className={styles.svg}
				src="/assets/svg/vue.svg"
				alt="Vue"
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
