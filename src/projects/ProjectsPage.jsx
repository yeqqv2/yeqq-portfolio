import ProjectsContainer from './../containers/projects/Page';
import ContactHomePage from '../home/contact/ContactHomePage';
import styles from "./style.module.css";

const ProjectsPage = () => {
	return (
		<div className={styles.container}>
			<ProjectsContainer />
			<ContactHomePage />
		</div>
	);
};

export default ProjectsPage;
