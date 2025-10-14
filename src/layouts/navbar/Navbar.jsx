import React, { useState, useRef, useEffect } from 'react';
import styles from './style.module.css';
import MenuButton from '../../tools/menu/MenuButton';
import gsap from 'gsap';
import { GoArrowRight } from 'react-icons/go';
import AnimatedLink from '../../components/animated link/AnimatedLink';

export default function Navbar() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const sidebarRef = useRef(null);

	useEffect(() => {
		gsap.set(sidebarRef.current, { x: '-100%' });
	}, []);

	useEffect(() => {
		if (isSidebarOpen) {
			gsap.to(sidebarRef.current, {
				x: '0%',
				duration: 0.5,
				ease: 'power3.out',
			});
		} else {
			gsap.to(sidebarRef.current, {
				x: '-100%',
				duration: 0.5,
				ease: 'power3.in',
			});
		}
	}, [isSidebarOpen]);

	const toggleSidebar = () => {
		setIsSidebarOpen((prev) => !prev);
	};

	return (
		<>
			<div className={styles.container}>
				<main className={`${styles.left} ${styles.main}`}>
					<div className={styles.button_bg}>
						<MenuButton
							toggleSidebar={toggleSidebar}
							isSidebarOpen={isSidebarOpen}
						/>
					</div>
				</main>
				<a href="/" className={styles.logo}>
					<div className={styles.button_bg}>
						[ yeqq ]
					</div>
				</a>
				<main className={`${styles.right} ${styles.main}`}>
					<a className={styles.contact_link_colored} href="/contact-me">
						● contact with me
					</a>
				</main>
			</div>
			{/* SIDEBAR */}
			<section ref={sidebarRef} className={styles.sidebar}>
				<span className={styles.close}>
					<MenuButton
						toggleSidebar={toggleSidebar}
						isSidebarOpen={isSidebarOpen}
					/>
				</span>
				<div className={styles.links}>
					<AnimatedLink
						href="/"
						defaultText="home"
						hoverText="go home"
						onClick={toggleSidebar}
						icon={GoArrowRight}
					/>
					<AnimatedLink
						href="/about-me"
						defaultText="aboutme"
						hoverText="info"
						onClick={toggleSidebar}
						icon={GoArrowRight}
					/>

					<AnimatedLink
						href="/projects"
						defaultText="projects"
						hoverText="my works"
						onClick={toggleSidebar}
						icon={GoArrowRight}
					/>
				</div>
				<div className={styles.links}>
					<div className={styles.contact_link_sec}>
						<div className={styles.contact_link_header}>[contact]</div>
						<div className={styles.contact_links}>
							<a
								className={styles.contact_link_colored_sidebar}
								href="/contact-me"
								onClick={toggleSidebar}
							>
								● get in touch
							</a>
						</div>
					</div>
					<div className={styles.contact_link_sec}>
						<div className={styles.contact_link_header}>[connect]</div>
						<div className={styles.contact_links}>
							<a
								className={styles.contact_link}
								target="__blank"
								href="https://www.instagram.com/1yunusewre"
								onClick={toggleSidebar}
							>
								instagram
							</a>
							,
							<a
								className={styles.contact_link}
								target="__blank"
								href="https://dribbble.com/yeqqv2"
								onClick={toggleSidebar}
							>
								dribbble
							</a>
							,
							<a
								className={styles.contact_link}
								target="__blank"
								href="https://github.com/yeqqv2"
								onClick={toggleSidebar}
							>
								github
							</a>
							,
							<a
								className={styles.contact_link}
								target="__blank"
								href="https://tr.linkedin.com/in/yunusemrekorkmaz34"
								onClick={toggleSidebar}
							>
								linkedin
							</a>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
