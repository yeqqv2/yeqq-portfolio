import React from 'react';
import styles from './style.module.css';
import IntlTelInput from 'react-intl-tel-input-18';
import './intTelInput.css';
// ================================================
// TRANSLATE
// ================================================
import { useTranslation } from 'react-i18next';

const ContactPage = () => {
	const { t } = useTranslation();

	return (
		<div className={styles.container}>
			<div className={styles.header}>{t('contactPage.header')}</div>
			<div className={styles.main}>
				<div className={styles.sidebar}>{t('contactPage.sidebar')}</div>
				<div className={styles.content}>
					<div className={styles.form}>
						{/* Name Input */}
						<div className={styles.input_group}>
							<label className={styles.label} htmlFor="name">
								{t('contactPage.form.nameLabel')}
							</label>
							<input
								className={styles.input}
								name="name"
								type="text"
								placeholder="yunus emre korkmaz"
							/>
						</div>

						{/* Company Input */}
						<div className={styles.input_group}>
							<label className={styles.label} htmlFor="company">
								{t('contactPage.form.companyLabel')}
							</label>
							<input
								className={styles.input}
								name="company"
								type="text"
								placeholder={t('contactPage.form.companyPlaceholder')}
							/>
						</div>

						{/* Email Input */}
						<div className={styles.input_group}>
							<label className={styles.label} htmlFor="email">
								{t('contactPage.form.emailLabel')}
							</label>
							<input
								className={styles.input}
								name="email"
								type="email"
								placeholder={t('contactPage.form.emailPlaceholder')}
							/>
						</div>

						{/* Phone Input */}
						<div className={styles.input_group}>
							<label className={styles.label} htmlFor="tel">
								{t('contactPage.form.telLabel')}
							</label>
							<IntlTelInput
								style={{ fontFamily: 'Outfit' }}
								inputClassName={styles.input}
								fieldName="phone"
								fieldId="phone"
								defaultValue=""
								defaultCountry="auto"
								geoIpLookup={(callback) => {
									fetch('https://ipapi.co/json')
										.then((res) => res.json())
										.then((data) => callback(data.country_code))
										.catch(() => callback('us'));
								}}
								separateDialCode={false}
								preferredCountries={['us', 'gb', 'tr']}
								allowDropdown={true}
								autoHideDialCode={true}
								autoPlaceholder="polite"
								excludeCountries={[]}
								formatOnInit={true}
								autoFocus={false}
								autoComplete="off"
								nationalMode={true}
								onPhoneNumberChange={() => {}}
								utilsScript="https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/utils.js"
							/>
						</div>

						{/* Subject Input */}
						<div className={styles.input_group}>
							<label className={styles.label} htmlFor="subject">
								{t('contactPage.form.subjectLabel')}
							</label>
							<input
								className={styles.input}
								name="subject"
								type="text"
								placeholder={t('contactPage.form.subjectPlaceholder')}
							/>
						</div>

						{/* Message Textarea */}
						<div className={styles.textarea_group}>
							<label className={styles.label} htmlFor="message">
								{t('contactPage.form.messageLabel')}
							</label>
							<textarea
								className={styles.textarea}
								name="message"
								placeholder={t('contactPage.form.messagePlaceholder')}
							/>
						</div>

						{/* Submit Button */}
						<div className={styles.button}>
							{t('contactPage.form.submitButton')}
						</div>
					</div>
				</div>

				{/* Sidebar Video Content */}
				<div className={styles.vid_content}>{/* Video Eklenebilir */}</div>
			</div>

			{/* Footer Section */}
			<div className={styles.footer}>
				<div className={styles.footer_content}>
					<p className={styles.footer_content_title}>
						{t('contactPage.footer.content1Title')}
					</p>
					<p className={styles.footer_content_content}>ynsmrkrkmzz@gmail.com</p>
				</div>
				<div className={styles.footer_content}>
					<p className={styles.footer_content_title}>
						{t('contactPage.footer.content2Title')}
					</p>
					<p className={styles.footer_content_content}>
						<a
							className={styles.contact_link}
							target="__blank"
							href="https://www.instagram.com/1yunusewre"
						>
							instagram
						</a>
						,
						<a
							className={styles.contact_link}
							target="__blank"
							href="https://dribbble.com/yeqqv2"
						>
							dribbble
						</a>
						,
						<a
							className={styles.contact_link}
							target="__blank"
							href="https://github.com/yeqqv2"
						>
							github
						</a>
						,
						<a
							className={styles.contact_link}
							target="__blank"
							href="https://tr.linkedin.com/in/yunusemrekorkmaz34"
						>
							linkedin
						</a>
					</p>
				</div>
			</div>
		</div>
	);
};

export default ContactPage;
