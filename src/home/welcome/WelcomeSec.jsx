import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import { CustomEase } from "gsap/CustomEase";
import styles from "./style.module.css";
import colors from "../../utils/colors";
import AnimatedSplit from "../../components/animated split/AnimatedSplit";

gsap.registerPlugin(ScrollTrigger, TextPlugin, CustomEase);

// custom ease
CustomEase.create("hop", "0.9, 0, 0.1, 1");

const WelcomeSec = () => {
	const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
	const [cursorStyles, setCursorStyles] = useState({
		bg: "var(--main-color500)",
		color: "var(--wb950)",
	});

	const cursorRef = useRef(null);
	const imgRef = useRef(null);

	/* --------------------------
		CURSOR LOGIC
	--------------------------- */
	const handleMouseMove = (e) => {
		setCursorPos({ x: e.clientX, y: e.clientY });
	};

	const handleMouseEnter = () => {
		const randomIndex = Math.floor(Math.random() * colors.length);
		const randomColor = colors[randomIndex];

		setCursorStyles({
			bg: randomColor.bg,
			color: randomColor.color,
		});

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

	/* --------------------------
	   SCROLL ANIMATIONS
	--------------------------- */
	useEffect(() => {
		// Image clip-path animation (kare)
		gsap.fromTo(
			imgRef.current,
			{
				clipPath: "inset(50% 50% 50% 50%)",
			},
			{
				clipPath: "inset(0% 0% 0% 0%)",
				duration: 1.2,
				ease: "hop",
				scrollTrigger: {
					trigger: imgRef.current,
					start: "top 80%",
				},
			}
		);
	}, []);


	return (
		<section className={styles.container}>
			<div className={styles.content}>
				<AnimatedSplit
					text={
						"[hey, i'm]"
					}
					className={styles.content_text}
					tagName="span"
					stagger={0.03}
					duration={1.5}
					start="top 80%"
				/>
				<a
					href="/about-me"
					onMouseMove={handleMouseMove}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
					className={styles.link}
					data-animate
				>
					<AnimatedSplit
						text={
							"[yunus emre korkmaz]"
						}
						tagName="span"
						stagger={0.03}
						duration={1.5}
						start="top 80%"
					/>

				</a>
			</div>

			<div className={styles.side_image_container}>
				<img
					ref={imgRef}
					className={styles.img}
					src="/assets/yunus-emre-korkmaz/6.webp"
					alt="Yunus Emre Korkmaz"
					aria-hidden="true"
					loading="lazy"
					decoding="async"
				/>
			</div>

			<div className={styles.content}>
				<AnimatedSplit
					text={
						"I design and build modern, intentional and motion-driven digital experiences."
					}
					className={styles.link}
					tagName="span"
					stagger={0.03}
					duration={1.5}
					start="top 80%"
				/>
			</div>

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
				● who is this?
			</span>
		</section>
	);
};

export default WelcomeSec;
