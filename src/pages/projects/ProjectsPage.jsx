import React from 'react';
import styles from './style.module.css';
import ContactHomePage from '../../containers/home/contact/ContactHomePage';
import ProjectsContainer from '../../containers/projects/Page';

const ProjectsPage = () => {
	return (
		<div className={styles.container}>
			<ProjectsContainer />
			<ContactHomePage />
		</div>
	);
};

export default ProjectsPage;
