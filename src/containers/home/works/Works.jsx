import { useState, useRef } from 'react';
import gsap from 'gsap';
import { CustomEase } from "gsap/CustomEase";
import styles from './style.module.css';
import projects from '../../../utils/projects';
import colors from '../../../utils/colors';

gsap.registerPlugin(CustomEase);
CustomEase.create("hop", "0, 0, 0.1, 1");

const cursorWords = [
	"see more",
	"case view",
	"view details",
	"open project",
	"quick peek",
	"discover more"
];

const WorksHomePage = () => {
	const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
	const [cursorStyles, setCursorStyles] = useState({
		bg: 'var(--main-color500)',
		color: 'var(--wb950)',
	});
	const [cursorText, setCursorText] = useState("see more");
	const [lastColorIndex, setLastColorIndex] = useState(null);
	const [lastWordIndex, setLastWordIndex] = useState(null);

	const getRandomIndexExcept = (length, except) => {
		let newIndex = Math.floor(Math.random() * length);
		while (newIndex === except) {
			newIndex = Math.floor(Math.random() * length);
		}
		return newIndex;
	};

	const cursorRef = useRef(null);

	const handleMouseMove = (e) => {
		setCursorPos({ x: e.clientX, y: e.clientY });
	};

	const handleMouseEnter = () => {
		// --- COLOR ---
		const newColorIndex = getRandomIndexExcept(colors.length, lastColorIndex);
		const newColor = colors[newColorIndex];
		setLastColorIndex(newColorIndex);

		setCursorStyles({
			bg: newColor.bg,
			color: newColor.color,
		});

		// --- WORD ---
		const newWordIndex = getRandomIndexExcept(cursorWords.length, lastWordIndex);
		setLastWordIndex(newWordIndex);
		setCursorText(cursorWords[newWordIndex]);

		// --- ANIMATION ---
		gsap.to(cursorRef.current, {
			scale: 1,
			opacity: 1,
			duration: 0.25,
			ease: "hop",
		});

		setHovered(true);
	};

	const handleMouseLeave = () => {
		gsap.to(cursorRef.current, {
			scale: 0,
			opacity: 0,
			duration: 0.25,
			ease: "hop",
		});
		setHovered(false);
	};

	const handleTouchStart = (e) => {
		const el = e.currentTarget;
		gsap.fromTo(el, { scale: 0.97 }, { scale: 1, duration: 0.3, ease: "power3.out" });
	};


	const lastThreeWorks = projects.slice(0, 6);

	return (
		<div className={styles.container}>
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
							onTouchStart={handleTouchStart}
						>
							<div className={styles.work_img}>
								<img
									src={`${work.asset}/${work.banner}`}
									alt={work.name}
									className={styles.img}
								/>
								{/* <video
									className={styles.img}
									src={work.banner}
									autoPlay
									loop
									muted
									playsInline
									poster="/assets/loader/video-placeholder.webp"
									preload="metadata"
									aria-describedby={work.name}
								/> */}
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
				ref={cursorRef}
				className={styles.customCursor}
				style={{
					left: cursorPos.x,
					top: cursorPos.y,
					backgroundColor: cursorStyles.bg,
					color: cursorStyles.color,
					opacity: 0,
				}}
			>
				● {cursorText}
			</span>
		</div>
	);
};

export default WorksHomePage;
