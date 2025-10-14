import styles from './style.module.css';


const ExpAbout = () => {
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.title}>[experience]</div>
				<div className={styles.desc}>
					I always focus on creating user-centered, aesthetic, and functional
					solutions. I believe that crafting custom designs for individuals or
					companies fuels my creativity.
				</div>
			</div>
			<div className={styles.main}>
				<div className={styles.card}>
					<div className={styles.card_header}>
						<span className={styles.plus}>+</span>
						<p className={styles.number}>
							10
						</p>
					</div>
					<div className={styles.card_footer}>[total projects]</div>
				</div>
				<div className={styles.card}>
					<div className={styles.card_header}>
						<span className={styles.plus}>+</span>
						<p className={styles.number}>
							2
						</p>
					</div>
					<div className={styles.card_footer}>[years of experience]</div>
				</div>
			</div>
		</div>
	);
};

export default ExpAbout;
