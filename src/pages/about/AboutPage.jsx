import React from 'react';
import styles from './style.module.css';
import AboutmeAbout from '../../containers/about/me/AboutmeAbout';
import ExpAbout from '../../containers/about/exp/ExpAbout';
import ContactHomePage from '../../containers/home/contact/ContactHomePage';
import IntroAbout from '../../containers/about/intro/IntroAbout';

const AboutPage = () => {
	return (
		<div className={styles.container}>
			<div className={styles.sec}>
				<IntroAbout />
			</div>
			<AboutmeAbout />
			<ExpAbout />
			<ContactHomePage />
		</div>
	);
};

export default AboutPage;
