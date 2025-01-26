import React from 'react';
import styles from './style.module.css';
import { IntroduceHome } from '../../containers/home/introduce/IntroduceHome';
import WelcomeSec from '../../containers/home/welcome/WelcomeSec';
import AboutmeAbout from '../../containers/about/me/AboutmeAbout';
import ExpAbout from '../../containers/about/exp/ExpAbout';
import ContactHomePage from '../../containers/home/contact/ContactHomePage';
// ================================================
// TRANSLATE
// ================================================
import { useTranslation } from 'react-i18next';

const AboutPage = () => {
	const { t } = useTranslation();

	const contactSentencesData =
		t('contactHomePage.sentencesData', { returnObjects: true }) || [];

	return (
		<div className={styles.container}>
			<IntroduceHome />
			<WelcomeSec message={t('welcomeSec.message')} />
			<AboutmeAbout
				cardOneText={t('aboutmeAbout.cardOneText')}
				cardTwoPart1={t('aboutmeAbout.cardTwoPart1')}
				cardTwoLink={t('aboutmeAbout.cardTwoLink')}
				cardTwoPart2={t('aboutmeAbout.cardTwoPart2')}
				customCursorText={t('aboutmeAbout.customCursorText')}
			/>
			<ExpAbout
				headerTitle={t('expAbout.headerTitle')}
				headerDesc={t('expAbout.headerDesc')}
				cardOneFooter={t('expAbout.cardOneFooter')}
				cardTwoFooter={t('expAbout.cardTwoFooter')}
			/>
			<ContactHomePage
				sentencesData={contactSentencesData}
				contextText={t('contactHomePage.contextText')}
				contactMePrefix={t('contactHomePage.contactMePrefix')}
				contactMeSpan={t('contactHomePage.contactMeSpan')}
				contactMeSuffix={t('contactHomePage.contactMeSuffix')}
			/>
		</div>
	);
};

export default AboutPage;
