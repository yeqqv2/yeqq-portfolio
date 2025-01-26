import React from 'react';
import styles from './style.module.css';
import Terminal from '../../animations/opening/OpeningAnimation';
// CONTAINERS
import IntroSec from '../../containers/home/intro/IntroSec';
import WelcomeSec from '../../containers/home/welcome/WelcomeSec';
import { IntroduceHome } from '../../containers/home/introduce/IntroduceHome';
import AboutmeHome from '../../containers/home/aboutme/AboutmeHome';
import WorksHomePage from '../../containers/home/works/Works';
import ContactHomePage from '../../containers/home/contact/ContactHomePage';
import SocialHomePage from '../../containers/home/social/SocialHomePage';
// ================================================
// TRANSLATE
// ================================================
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';

const HomePage = () => {
	const { t } = useTranslation();

	i18n.changeLanguage('en');

	return (
		<div className={styles.container}>
			<Terminal quote={t('terminal.quote')} author={t('terminal.author')} />
			<IntroSec marqueeText={t('introSec.marqueeText')} />
			<WelcomeSec message={t('welcomeSec.message')} />
			<IntroduceHome />
			<AboutmeHome
				header={t('aboutmeHome.header')}
				mainPart1={t('aboutmeHome.mainPart1')}
				mainPart2={t('aboutmeHome.mainPart2')}
				mainPart3={t('aboutmeHome.mainPart3')}
				technologies={[
					t('aboutmeHome.html'),
					t('aboutmeHome.css'),
					t('aboutmeHome.sass'),
					t('aboutmeHome.js'),
					t('aboutmeHome.react'),
					t('aboutmeHome.vue'),
				]}
				footerLink={t('aboutmeHome.footerLink')}
			/>
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
			<SocialHomePage header={t('socialHomePage.headerTitle')} />
		</div>
	);
};

export default HomePage;
