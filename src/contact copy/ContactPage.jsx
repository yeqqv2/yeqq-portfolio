import AnimatedSplit from '../components/animated split/AnimatedSplit';
import styles from './style.module.css';

const ContactPage = () => {
	return (
		<div className={styles.container}>
			<AnimatedSplit
				text="[online meeting,message me]"
				className={styles.header}
				tagName="span"
				stagger={0.03}
				duration={1.5}
				start="top 80%"
			/>

			<div className={styles.main}>
				<AnimatedSplit
					text="please contact me to set up an online meeting or ask any questions you have."
					className={styles.sidebar_title}
					tagName="span"
					stagger={0.03}
					duration={1.5}
					start="top 80%"
				/>

				<div className={styles.content}>

					{/* ---------------- FORM START ---------------- */}
					<form
						action="https://formspree.io/f/mvglyqek"
						method="POST"
						className={styles.form}
					>

						<div className={styles.input_group}>
							<label className={styles.label} htmlFor="name">
								name,surname
							</label>
							<input
								className={styles.input}
								name="fullname"
								type="text"
								placeholder="yunus emre korkmaz"
								required
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
								required
							/>
						</div>

						<div className={styles.input_group}>
							<label className={styles.label} htmlFor="tel">
								phone
							</label>
							<input
								className={styles.input}
								name="phone"
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
								placeholder="describe whatever you want."
								required
							/>
						</div>

						<button type="submit" className={styles.button}>
							● let's get started
						</button>
					</form>
					{/* ---------------- FORM END ---------------- */}

				</div>

				<div className={styles.vid_content}></div>
			</div>

			<div className={styles.footer}>
				<div className={styles.footer_content}>
					<AnimatedSplit
						text="[contact]"
						className={styles.footer_content_title}
						tagName="span"
						stagger={0.03}
						duration={1.5}
						start="top 80%"
					/>
					<AnimatedSplit
						text="ynsmrkrkmzz@gmail.com"
						className={styles.contact_link}
						tagName="span"
						stagger={0.03}
						duration={1.5}
						start="top 80%"
					/>
				</div>

				<div className={styles.footer_content}>
					<AnimatedSplit
						text="[connect]"
						className={styles.footer_content_title}
						tagName="span"
						stagger={0.03}
						duration={1.5}
						start="top 80%"
					/>

					<div className={styles.footer_content_content}>
						<a
							className={styles.contact_link}
							target="__blank"
							href="https://www.instagram.com/1yunusewre"
						>
							<AnimatedSplit
								text="instagram"
								tagName="span"
								stagger={0.03}
								duration={1.5}
								start="top 80%"
							/>
						</a>

						<AnimatedSplit
							text=","
							tagName="span"
							stagger={0.03}
							duration={1.5}
							start="top 80%"
						/>

						<a
							className={styles.contact_link}
							target="__blank"
							href="https://github.com/yeqqv2"
						>
							<AnimatedSplit
								text="github"
								tagName="span"
								stagger={0.03}
								duration={1.5}
								start="top 80%"
							/>
						</a>

						<AnimatedSplit
							text=","
							tagName="span"
							stagger={0.03}
							duration={1.5}
							start="top 80%"
						/>

						<a
							className={styles.contact_link}
							target="__blank"
							href="https://tr.linkedin.com/in/yeqq"
						>
							<AnimatedSplit
								text="linkedin"
								tagName="span"
								stagger={0.03}
								duration={1.5}
								start="top 80%"
							/>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContactPage;
