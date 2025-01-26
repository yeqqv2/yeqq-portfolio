import React from 'react';
import styles from './style.module.css';
import WorksHomePage from '../../containers/home/works/Works';
import ContactHomePage from '../../containers/home/contact/ContactHomePage';
// ================================================
// TRANSLATE
// ================================================
import { useTranslation } from 'react-i18next';

const ProjectsPage = () => {
	const { t } = useTranslation();
	return (
		<div className={styles.container}>
			<WorksHomePage
				headerTitleLeft={t('worksHomePage.headerTitleLeft')}
				headerDescRight={t('worksHomePage.headerDescRight')}
				cursorText={t('worksHomePage.cursorText')}
				works={t('worksHomePage.works', { returnObjects: true }) || []}
			/>
			<ContactHomePage
				sentencesData={
					t('contactHomePage.sentencesData', { returnObjects: true }) || []
				}
				contextText={t('contactHomePage.contextText')}
				contactMePrefix={t('contactHomePage.contactMePrefix')}
				contactMeSpan={t('contactHomePage.contactMeSpan')}
				contactMeSuffix={t('contactHomePage.contactMeSuffix')}
			/>
		</div>
	);
};

export default ProjectsPage;
