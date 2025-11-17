import React from 'react';
import styles from './style.module.css';

const Footer = () => {
	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<header className={styles.logo}>[ yeqq ]</header>
				<section className={styles.links_container}>

					<main className={styles.links}>
						<div className={styles.links_header}>[links]</div>
						<div className={styles.links_content}>
							<a className={styles.link} href="/">
								home
							</a>
							<a className={styles.link} href="/about-me">
								aboutme
							</a>
							<a className={styles.link} href="/projects">
								projects
							</a>
						</div>
					</main>

					<main className={styles.links}>
						<div className={styles.links_header}>[connect]</div>
						<div className={styles.links_content}>
							<a
								className={styles.link}
								target="__blank"
								href="https://www.instagram.com/1yunusewre"
							>
								instagram
							</a>
							<a
								className={styles.link}
								target="__blank"
								href="https://github.com/yeqqv2"
							>
								github
							</a>
							<a
								className={styles.link}
								target="__blank"
								href="https://tr.linkedin.com/in/yeqq"
							>
								linkedin
							</a>
						</div>
					</main>
					<main className={styles.links}>
						<div className={styles.links_header}>[contact]</div>
						<div className={styles.links_content}>
							<a className={styles.link} href="/contact-me">
								get in touch
							</a>
						</div>
					</main>
				</section>
			</div>
			<hr />
			<footer className={styles.footer}>
				created by yunus emre korkmaz © 2025
			</footer>
		</div>
	);
};

export default Footer;
