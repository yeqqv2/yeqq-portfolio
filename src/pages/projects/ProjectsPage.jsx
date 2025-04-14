import React from 'react';
import styles from './style.module.css';
import WorksHomePage from '../../containers/home/works/Works';
import ContactHomePage from '../../containers/home/contact/ContactHomePage';
import ProjectsContainer from '../../containers/projects/Page';

const ProjectsPage = () => {
	return (
		<div className={styles.container}>
			{/* <WorksHomePage /> */}
			<ProjectsContainer />
			<ContactHomePage />
		</div>
	);
};

export default ProjectsPage;
