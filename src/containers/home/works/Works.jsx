import React, { useState } from 'react';
import styles from './style.module.css';
import works from '../../../utils/works';
import colors from '../../../utils/colors';

const WorksHomePage = () => {
	const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
	const [hovered, setHovered] = useState(false);
	const [cursorStyles, setCursorStyles] = useState({
		bg: 'var(--main-color500)',
		color: 'var(--wb950)',
	});

	const handleMouseMove = (e) => {
		setCursorPos({ x: e.clientX, y: e.clientY });
	};

	const handleMouseEnter = () => {
		const randomIndex = Math.floor(Math.random() * colors.length);
		const randomColor = colors[randomIndex];
		setCursorStyles({ bg: randomColor.bg, color: randomColor.color });
		setHovered(true);
	};

	const handleMouseLeave = () => {
		setHovered(false);
	};

	return (
		<div className={styles.container}>
			<header className={styles.header}>
				<div className={`${styles.header_title} ${styles.div_left}`}>
					(projects & works)
				</div>
				<div className={`${styles.header_desc} ${styles.div_right}`}>
					for all web-based projects, I took on the role of frontend developer
					and UI/UX designer. for any project that didn’t require a backend
					(NoSQL, one-page, landing page, etc.), I developed them using React or
					Next.js.
				</div>
			</header>
			<main className={styles.main}>
				{works.map((work, index) => {
					return (
						<a
							href={work.link}
							className={styles.main_div}
							key={index}
							onMouseMove={handleMouseMove}
							onMouseEnter={handleMouseEnter}
							onMouseLeave={handleMouseLeave}
							target="__blank"
						>
							<div key={index} className={`${styles.works} ${styles.div_left}`}>
								<div className={styles.work_techs}>
									{work.techs.map((tech, index) => (
										<span className={styles.tech} key={index}>
											{tech}
										</span>
									))}
								</div>
								<div className={styles.work_context}>
									<div className={styles.work_name}>({work.name})</div>
									<div className={styles.work_desc}>{work.desc}</div>
								</div>
							</div>
							<div
								className={`${styles.work_img} ${styles.div_right}`}
								style={{ backgroundColor: work.color }}
							>
								<img
									key={index}
									src={`${work.asset}/1.png`}
									alt={work.desc}
									className={styles.img}
								/>
							</div>
						</a>
					);
				})}
			</main>
			<span
				className={styles.customCursor}
				style={{
					left: cursorPos.x,
					top: cursorPos.y,
					display: hovered ? 'flex' : 'none',
					backgroundColor: cursorStyles.bg,
					color: cursorStyles.color,
				}}
			>
				● see my projects
			</span>
		</div>
	);
};

export default WorksHomePage;
