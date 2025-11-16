import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import { CustomEase } from "gsap/CustomEase";
import SplitType from "split-type";
import styles from "./style.module.css";
import colors from "../../../utils/colors";

gsap.registerPlugin(ScrollTrigger, TextPlugin, CustomEase);

// custom ease
CustomEase.create("hop", "0, 0, 0.1, 1");

const WelcomeSec = () => {
	const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
	const [cursorStyles, setCursorStyles] = useState({
		bg: "var(--main-color500)",
		color: "var(--wb950)",
	});

	const cursorRef = useRef(null);
	const imgRef = useRef(null);
	const firstTextRef = useRef(null);
	const secondTextRef = useRef(null);

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
				ease: "power3.out",
				scrollTrigger: {
					trigger: imgRef.current,
					start: "top 40%",
				},
			}
		);

		// TEXT ANIMATIONS — WORDS
		const firstSplit = new SplitType(firstTextRef.current, {
			types: "words",
		});

		const secondSplit = new SplitType(secondTextRef.current, {
			types: "words",
		});

		gsap.from(firstSplit.words, {
			y: "110%",
			rotationZ: 10,
			opacity: 0,
			duration: 0.5,
			ease: "power1.out",
			stagger: 0.05,
			scrollTrigger: {
				trigger: firstTextRef.current,
				start: "top 50%",
			},
		});

		gsap.from(secondSplit.words, {
			y: "110%",
			rotationZ: 10,
			opacity: 0,
			duration: 0.5,
			ease: "power1.out",
			stagger: 0.05,
			scrollTrigger: {
				trigger: secondTextRef.current,
				start: "top 50%",
			},
		});
	}, []);


	return (
		<section className={styles.container}>
			<div className={styles.content}>
				<div className={styles.content_text} ref={firstTextRef} data-animate>
					hey, i'm
				</div>

				<a
					href="/about-me"
					onMouseMove={handleMouseMove}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
					className={styles.link}
					data-animate
				>
					[yunus emre korkmaz]
				</a>
			</div>

			<div className={styles.side_image_container}>
				<img
					ref={imgRef}
					className={styles.img}
					src="/public/assets/images/me/3.webp"
					alt=""
				/>
			</div>

			<div className={styles.content}>
				<div ref={secondTextRef} className={styles.link} data-animate>
					I <strong>design</strong> and <strong>build</strong> modern,
					accessible, and high performance digital arts.
				</div>
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
