import React from 'react';
import styles from './style.module.css';

const BackstageHomePage = () => {
	return (
		<div className={styles.container}>
			<h1 className={styles.context}>
				let's drop the <br /> formality
			</h1>
			<a href='/backstage' className={styles.button}>
				● enter the backstage
			</a>
		</div>
	);
};

export default BackstageHomePage;
