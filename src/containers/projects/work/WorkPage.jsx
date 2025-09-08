import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './style.module.css';
import works from '../../../utils/works';
import colors from '../../../utils/colors';

const WorkPage = () => {
	const { name } = useParams();
	const work = works.find((w) => w.link.includes(name));

	const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
	const [hovered, setHovered] = useState(false);
	const [cursorStyles, setCursorStyles] = useState({
		bg: 'var(--blue500)',
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
			<div className={styles.header}>
				<div className={styles.title}>{work.name}</div>
				<div className={styles.desc}>{work.desc}</div>
			</div>
			<div className={styles.main}>
				<div className={styles.main_header}>
					<div className={styles.description}>{work?.intro_1}</div>
					<div className={styles.description}>{work?.intro_2}</div>
					<div className={styles.description}>{work?.intro_3}</div>
				</div>
				<a className={styles.link} href={work.weblink}
					target='__blank'
					onMouseMove={handleMouseMove}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}>
					<img
						className={styles.link_img}
						src={`${work.asset}/1.png`} alt={work.name} />

				</a>
			</div>
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
				● go to website
			</span>
		</div>
	);
};

export default WorkPage;
