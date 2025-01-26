import React from 'react';
import styles from './style.module.css';
import StaryNight from '../../components/stars/StaryNight';
import WorksHomePage from '../../containers/home/works/Works';
import ContactHomePage from '../../containers/home/contact/ContactHomePage';

const ProjectsPage = () => {
	return (
		<div className={styles.container}>
			<WorksHomePage />
            <ContactHomePage/>
		</div>
	);
};

export default ProjectsPage;
