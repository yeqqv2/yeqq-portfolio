import React from 'react';
import styles from './style.module.css';

const social = [
	{
		name: 'instagram,',
		link: 'https://www.instagram.com/1yunusewre',
		images: [
			'/assets/images/social/instagram/1.jpeg',
			'/assets/images/social/instagram/3.jpeg',
			'/assets/images/social/instagram/2.jpeg',
		],
	},
	{
		name: 'spotify,',
		link: 'https://shorturl.at/jFiom',
		images: [
			'/assets/images/social/spotify/1.png',
			'/assets/images/social/spotify/2.png',
			'/assets/images/social/spotify/3.png',
		],
	},
	{
		name: 'letterboxd,',
		link: 'https://letterboxd.com/yeqq',
		images: [
			'/assets/images/social/letterboxd/1.png',
			'/assets/images/social/letterboxd/2.png',
			'/assets/images/social/letterboxd/3.png',
		],
	},
	{
		name: 'github,',
		link: 'https://github.com/yeqqv2',
		images: [
			'/assets/images/social/github/1.png',
			'/assets/images/social/github/2.png',
			'/assets/images/social/github/3.png',
		],
	},
	{
		name: 'dribbble',
		link: 'https://dribbble.com/yeqqv2',
		images: [
			'/assets/images/social/dribbble/1.png',
			'/assets/images/social/dribbble/2.png',
			'/assets/images/social/dribbble/3.png',
		],
	},
];

const SocialHomePage = () => {
	return (
		<div className={styles.container}>
			<header className={styles.header}>
				<div className={styles.header_title}>(social 👌)</div>
			</header>
			<main className={styles.main}>
				{social.map((item, index) => {
					return (
						<div key={index} className={styles.social}>
							<a
								href={item.link}
								target="__blank"
								className={`${styles.social_card} ${styles.link}`}
								rel="noopener noreferrer"
							>
								<div className={styles.link_title}>
									{item.name}
								</div>
							</a>
						</div>
					);
				})}
			</main>
		</div>
	);
};

export default SocialHomePage;
