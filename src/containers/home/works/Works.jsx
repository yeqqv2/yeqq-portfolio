import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import styles from './style.module.css';
import projects from '../../../utils/projects';
import colors from '../../../utils/colors';

gsap.registerPlugin(CustomEase, ScrollTrigger);
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
	const [cursorText, setCursorText] = useState("see more");
	const [lastColorIndex, setLastColorIndex] = useState(null);
	const [lastWordIndex, setLastWordIndex] = useState(null);

	const cursorRef = useRef(null);
	const workRefs = useRef([]);
	const cursorStylesRef = useRef({
		bg: 'var(--main-color500)',
		color: 'var(--wb950)',
	});

	const getRandomIndexExcept = (length, except) => {
		let newIndex = Math.floor(Math.random() * length);
		while (newIndex === except) {
			newIndex = Math.floor(Math.random() * length);
		}
		return newIndex;
	};

	const handleMouseMove = (e) => {
		if (cursorRef.current) {
			cursorRef.current.style.left = e.clientX + 'px';
			cursorRef.current.style.top = e.clientY + 'px';
		}
	};

	const handleMouseEnter = () => {
		// --- COLOR ---
		const newColorIndex = getRandomIndexExcept(colors.length, lastColorIndex);
		const newColor = colors[newColorIndex];
		setLastColorIndex(newColorIndex);

		// Cursor rengini doğrudan güncelle
		if (cursorRef.current) {
			cursorRef.current.style.backgroundColor = newColor.bg;
			cursorRef.current.style.color = newColor.color;
		}

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
	};

	const handleMouseLeave = () => {
		gsap.to(cursorRef.current, {
			scale: 0,
			opacity: 0,
			duration: 0.25,
			ease: "hop",
		});
	};

	const handleTouchStart = (e) => {
		const el = e.currentTarget;
		gsap.fromTo(el, { scale: 0.97 }, { scale: 1, duration: 0.3, ease: "power3.out" });
	};

	// Card animasyonları
	useEffect(() => {
		workRefs.current.forEach((work) => {
			if (work) {
				const img = work.querySelector(`.${styles.work_img}`);
				if (img) {
					gsap.fromTo(
						img,
						{
							clipPath: "inset(100% 0% 0% 0%)",
						},
						{
							clipPath: "inset(0% 0% 0% 0%)",
							duration: 1.5,
							ease: "power3.out",
							scrollTrigger: {
								trigger: work,
								start: "top 85%",
							},
						}
					);
				}
			}
		});

		return () => {
			ScrollTrigger.getAll().forEach(trigger => trigger.kill());
		};
	}, []);

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
							ref={(el) => (workRefs.current[index] = el)}
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
					left: 0,
					top: 0,
					backgroundColor: cursorStylesRef.current.bg,
					color: cursorStylesRef.current.color,
					opacity: 0,
					transform: 'translate(-50%, -50%)',
				}}
			>
				● {cursorText}
			</span>
		</div>
	);
};

export default WorksHomePage;