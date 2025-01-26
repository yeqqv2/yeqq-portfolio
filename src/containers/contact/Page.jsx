import React from 'react';
import styles from './style.module.css';
import IntlTelInput from 'react-intl-tel-input-18';
import './intTelInput.css';

const ContactPage = () => {
	return (
		<div className={styles.container}>
			<div className={styles.header}>(online randevu, iletişim)</div>
			<div className={styles.main}>
				<div className={styles.sidebar}>
					online toplantı ayarlamak veya sorularınızı sormak için lütfen benimle
					iletişime geçin
				</div>
				<div className={styles.content}>
					<div className={styles.form}>
						<div className={styles.input_group}>
							<label className={styles.label} htmlFor="name">
								ad,soyad
							</label>
							<input
								className={styles.input}
								name="name"
								type="text"
								placeholder="yunus emre korkmaz"
							/>
						</div>
						<div className={styles.input_group}>
							<label className={styles.label} htmlFor="company">
								firma
							</label>
							<input
								className={styles.input}
								name="company"
								type="text"
								placeholder="firma adı"
							/>
						</div>
						<div className={styles.input_group}>
							<label className={styles.label} htmlFor="email">
								email
							</label>
							<input
								className={styles.input}
								name="email"
								type="email"
								placeholder="example@example.com"
							/>
						</div>
						<div className={styles.input_group}>
							<label className={styles.label} htmlFor="tel">
								telefon numarası
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
							{/* <input
								className={styles.input}
								name="tel"
								type="tel"
								placeholder="+90 000 000 0000"
							/> */}
						</div>
						<div className={styles.input_group}>
							<label className={styles.label} htmlFor="subject">
								konu
							</label>
							<input
								className={styles.input}
								name="subject"
								type="text"
								placeholder="web uygulaması, mobil uygulama"
							/>
						</div>
						<div className={styles.textarea_group}>
							<label className={styles.label} htmlFor="message">
								mesaj
							</label>
							<textarea
								className={styles.textarea}
								name="message"
								type="text"
								placeholder="mesajınızı buraya yazabilirsiniz"
							/>
						</div>
						<div className={styles.button}>● gönder</div>
					</div>
				</div>
				<div className={styles.vid_content}>
					{/* <video
						className={styles.vid}
						src="https://videos.pexels.com/video-files/18069700/18069700-uhd_1440_2560_24fps.mp4"
						autoPlay
						preload="auto"
						loop
						muted
						playsInline
					/> */}
				</div>
			</div>
			<div className={styles.footer}>
				<div className={styles.footer_content}>
					<p className={styles.footer_content_title}>(iletişim)</p>
					<p className={styles.footer_content_content}>ynsmrkrkmzz@gmail.com</p>
				</div>
				<div className={styles.footer_content}>
					<p className={styles.footer_content_title}>(bağlantılar)</p>
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
