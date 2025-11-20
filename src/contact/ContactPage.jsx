import AnimatedSplit from '../components/animated split/AnimatedSplit';
import styles from './style.module.css';
import FormContainer from './form/FormContainer';

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
					<FormContainer />
				</div>

				{/* <div className={styles.vid_content}></div> */}
			</div>

			<div className={styles.footer}>
				<div className={styles.footer_content}>
					<AnimatedSplit
						text="[contact]"
						className={styles.footer_content_title}
						tagName="span"
						stagger={0.03}
						duration={1.5}
						start="top 100%"
					/>
					<AnimatedSplit
						text="ynsmrkrkmzz@gmail.com"
						className={styles.contact_link}
						tagName="span"
						stagger={0.03}
						duration={1.5}
						start="top 100%"
					/>
				</div>

				<div className={styles.footer_content}>
					<AnimatedSplit
						text="[connect]"
						className={styles.footer_content_title}
						tagName="span"
						stagger={0.03}
						duration={1.5}
						start="top 100%"
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
								start="top 100%"
							/>
						</a>

						<AnimatedSplit
							text=","
							tagName="span"
							stagger={0.03}
							duration={1.5}
							start="top 100%"
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
								start="top 100%"
							/>
						</a>

						<AnimatedSplit
							text=","
							tagName="span"
							stagger={0.03}
							duration={1.5}
							start="top 100%"
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
								start="top 100%"
							/>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContactPage;
