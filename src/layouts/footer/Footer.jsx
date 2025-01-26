import React from 'react';
import styles from './style.module.css';
import { useTranslation } from 'react-i18next';

const Footer = () => {
	const { t } = useTranslation();

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<header className={styles.logo}>( yeqq )</header>
				<main className={styles.links}>
					<div className={styles.links_header}>{t('footer.routesHeader')}</div>
					<div className={styles.links_content}>
						{t('footer.routesLinks', { returnObjects: true }).map(
							(link, index) => (
								<a
									key={index}
									className={styles.link}
									href={['/', '/about-me', '/projects'][index]}
								>
									{link}
								</a>
							)
						)}
					</div>
				</main>

				<main className={styles.links}>
					<div className={styles.links_header}>
						{t('footer.socialLinksHeader')}
					</div>
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
							href="https://dribbble.com/yeqqv2"
						>
							dribbble
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
							href="https://tr.linkedin.com/in/yunusemrekorkmaz34"
						>
							linkedin
						</a>
					</div>
				</main>
				<main className={styles.links}>
					<div className={styles.links_header}>{t('footer.contactHeader')}</div>
					<div className={styles.links_content}>
						<a className={styles.link} href="/contact-me">
							{t('footer.contactLinkText')}
						</a>
					</div>
				</main>
			</div>
			<hr />
			<footer className={styles.footer}>{t('footer.footerText')}</footer>
		</div>
	);
};

export default Footer;
