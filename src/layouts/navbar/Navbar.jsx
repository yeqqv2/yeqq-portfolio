import React, { useState, useRef, useEffect } from 'react';
import styles from './style.module.css';
import MenuButton from '../../tools/menu/MenuButton';
import gsap from 'gsap';
import { GoArrowRight } from 'react-icons/go';
// import AnimatedLink from '../../components/animated link/AnimatedLink';

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
				<main className={`${styles.menu_item} ${styles.left}`}>
					<MenuButton
						toggleSidebar={toggleSidebar}
						isSidebarOpen={isSidebarOpen}
					/>
				</main>
				<a href="/" className={styles.logo}>
					[ yeqq ]
				</a>
				{/* <section className={styles.nav_links}>
					<a href="/" className={styles.nav_link}>
						home
					</a>
					,
					<a href="/about-me" className={styles.nav_link}>
						aboutme
					</a>
					,
					<a href="/projects" className={styles.nav_link}>
						projects
					</a>
				</section> */}
				<main className={`${styles.right} ${styles.menu_item}`}>
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
					<a href="/" className={styles.link}>
						<span className={styles.link_icon}>
							<GoArrowRight />
						</span>
						home
					</a>
					<a href="/about-me" className={styles.link}>
						<span className={styles.link_icon}>
							<GoArrowRight />
						</span>
						aboutme
					</a>
					<a href="/projects" className={styles.link}>
						<span className={styles.link_icon}>
							<GoArrowRight />
						</span>
						projects
					</a>
					{/* <AnimatedLink
						href="/"
						defaultText="home"
						hoverText="go home"
						onClick={toggleSidebar}
						icon={GoArrowRight}
						arialabel="home"
					/> */}
					{/* <AnimatedLink
						href="/about-me"
						defaultText="aboutme"
						hoverText="info"
						onClick={toggleSidebar}
						icon={GoArrowRight}
						arialabel="aboutme"
					/> */}

					{/* <AnimatedLink
						href="/projects"
						defaultText="projects"
						hoverText="my works"
						onClick={toggleSidebar}
						icon={GoArrowRight}
						arialabel="projects"
					/> */}
				</div>
				<div className={styles.links}>
					<div className={styles.contact_link_sec}>
						<div className={styles.contact_link_header}>[contact]</div>
						<div className={styles.contact_links}>
							<a
								className={styles.contact_link_colored_sidebar}
								href="/contact-me"
								onClick={toggleSidebar}
								aria-label="Contact Page"
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
								aria-label="My Instagram Profile"
							>
								instagram
							</a>
							,
							<a
								className={styles.contact_link}
								target="__blank"
								href="https://github.com/yeqqv2"
								onClick={toggleSidebar}
								aria-label="My Github Profile"
							>
								github
							</a>
							,
							<a
								className={styles.contact_link}
								target="__blank"
								href="https://tr.linkedin.com/in/yeqq"
								onClick={toggleSidebar}
								aria-label="My Linkedin Profile"
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
