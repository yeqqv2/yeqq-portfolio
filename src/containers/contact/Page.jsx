import React, { useEffect, useRef } from 'react';
import styles from './style.module.css';
import IntlTelInput from 'react-intl-tel-input-18';
import './intTelInput.css';
import Calendar from 'react-calendar';

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
								placeholder="adınız,soyadınız"
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
								tel
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
					</div>
					<div className={styles.date}>
						<Calendar
							selectRange={false}
							defaultValue={new Date()}
							defaultView="month"
							goToRangeStartOnSelect={false}
							maxDate={new Date(2028, 11, 31)}
							minDate={new Date(2022, 0, 1)}
							view="month"
							minDetail="month"
							maxDetail="month"
							showNavigation={false}
							showNeighboringMonth={false}
							showDoubleView={false}
							navigationAriaLabel="Go up"
							navigationAriaLive="polite"
							next2AriaLabel="Jump forwards"
							next2Label="»"
							nextAriaLabel="Next"
							nextLabel="›"
							prev2AriaLabel="Jump backwards"
							prev2Label="«"
							prevAriaLabel="Previous"
							prevLabel="‹"
						/>
					</div>
				</div>
			</div>
			<div className={styles.footer}></div>
		</div>
	);
};

export default ContactPage;
