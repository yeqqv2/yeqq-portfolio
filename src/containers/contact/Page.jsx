import styles from './style.module.css';

const ContactPage = () => {
	return (
		<div className={styles.container}>
			<div className={styles.header}>[online meeting,message me]</div>
			<div className={styles.main}>
				<div className={styles.sidebar}>
					please contact me to set up an online meeting or ask any questions you
					have.
				</div>
				<div className={styles.content}>
					<div className={styles.form}>
						<div className={styles.input_group}>
							<label className={styles.label} htmlFor="name">
								name,surname
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
								company
							</label>
							<input
								className={styles.input}
								name="company"
								type="text"
								placeholder="apple computer, inc."
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
								phone
							</label>
							<input
								className={styles.input}
								name="tel"
								type="tel"
								placeholder="+90 555 555 55 55"
							/>
						</div>
						<div className={styles.input_group}>
							<label className={styles.label} htmlFor="subject">
								subject
							</label>
							<input
								className={styles.input}
								name="subject"
								type="text"
								placeholder="web app, mobile app, UI/UX design"
							/>
						</div>
						<div className={styles.textarea_group}>
							<label className={styles.label} htmlFor="message">
								message
							</label>
							<textarea
								className={styles.textarea}
								name="message"
								type="text"
								placeholder="describe whatever you want."
							/>
						</div>
						<div className={styles.button}>● let's get started</div>
					</div>
				</div>
				<div className={styles.vid_content}>
				</div>
			</div>
			<div className={styles.footer}>
				<div className={styles.footer_content}>
					<p className={styles.footer_content_title}>[contact]</p>
					<p className={styles.footer_content_content}>ynsmrkrkmzz@gmail.com</p>
				</div>
				<div className={styles.footer_content}>
					<p className={styles.footer_content_title}>[connect]</p>
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
							href="https://github.com/yeqqv2"
						>
							github
						</a>
						,
						<a
							className={styles.contact_link}
							target="__blank"
							href="https://tr.linkedin.com/in/yeqq"
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
