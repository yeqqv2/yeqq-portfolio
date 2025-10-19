import { useState } from 'react';
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

	const lastThreeWorks = works.slice(-9);

	return (
		<div className={styles.container}>
			<header className={styles.header}>
				<div className={styles.header_title}>
					[projects,works]
				</div>
				{/* <div className={styles.header_desc}>
					for all web-based projects, I took on the role of frontend developer
					and UI/UX designer.
				</div> */}
			</header>
			<main className={styles.main}>
				{lastThreeWorks.map((work, index) => {
					return (
						<a
							href={work.link}
							className={styles.main_div}
							key={index}
							onMouseMove={handleMouseMove}
							onMouseEnter={handleMouseEnter}
							onMouseLeave={handleMouseLeave}
						>
							<div
								className={styles.work_img}
								style={{ backgroundColor: work.color }}
							>
								<video
									className={styles.img}
									src={work.banner}
									autoPlay
									loop
									muted
									playsInline
									poster="/assets/loader/video-placeholder.webp"
									preload="metadata"
									aria-describedby={work.name}
								/>
							</div>
							<div className={styles.works}>
								<div className={styles.work_name}>{work.project_name}</div>
								<div className={styles.work_desc}>{work.company_name}</div>
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
				● more detail
			</span>
		</div>
	);
};

export default WorksHomePage;
