import React, { useState, useRef, useEffect } from 'react';
import styles from './style.module.css';
import MenuButton from '../../tools/menu/MenuButton';
import gsap from 'gsap';
import { GoArrowRight } from 'react-icons/go';

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
					<MenuButton
						toggleSidebar={toggleSidebar}
						isSidebarOpen={isSidebarOpen}
					/>
				</main>
				<a href="/" className={styles.logo}>
					( yeqq )
				</a>
				<main className={`${styles.right} ${styles.main}`}>
					<a className={styles.contact_link_colored} href="/contact-me">
						● iletişime geç
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
					<a className={styles.link} href="/" onClick={toggleSidebar}>
						<span className={styles.link_icon}>
							<GoArrowRight />
						</span>
						Anasayfa
					</a>
					<a className={styles.link} href="/about-me" onClick={toggleSidebar}>
						<span className={styles.link_icon}>
							<GoArrowRight />
						</span>
						Hakkımda
					</a>
					<a className={styles.link} href="/projects" onClick={toggleSidebar}>
						<span className={styles.link_icon}>
							<GoArrowRight />
						</span>
						Projeler
					</a>
				</div>
				<div className={styles.links}>
					<div className={styles.contact_link_sec}>
						<div className={styles.contact_link_header}>(iletişim)</div>
						<div className={styles.contact_links}>
							<a
								className={styles.contact_link_colored}
								href="/contact-me"
								onClick={toggleSidebar}
							>
								● iletişime geç
							</a>
						</div>
					</div>
					<div className={styles.contact_link_sec}>
						<div className={styles.contact_link_header}>(bağlantı)</div>
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
