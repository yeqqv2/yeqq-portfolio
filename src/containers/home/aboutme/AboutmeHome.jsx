import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import SplitType from "split-type";
import styles from "./style.module.css";

gsap.registerPlugin(ScrollTrigger, CustomEase);

// Custom ease
CustomEase.create("hop", "0, 0, 0.1, 1");

const AboutmeHome = () => {
	const textRef = useRef(null);
	const footerRef = useRef(null);

	useEffect(() => {
		const split = new SplitType(textRef.current, {
			types: "lines, words, chars",
			tagName: "span",
		});

		// TEXT SCRUB ANIMATION
		gsap.from(split.chars, {
			opacity: 0.15,
			duration: 0.0001,
			ease: "hop",
			stagger: 0.025,
			fontWeight: 100,
			scrollTrigger: {
				trigger: textRef.current,
				start: "top 70%",
				end: "top 40%",
				scrub: true,
			},
		});

		gsap.fromTo(
			footerRef.current,
			{
				opacity: 0,
				scale: 0,
			},
			{
				opacity: 1,
				scale: 1,
				duration: 0.4,
				ease: "hop",
				scrollTrigger: {
					trigger: textRef.current,
					start: "top 40%",
					scrub: false,
				},
			}
		);
	}, []);

	return (
		<div className={styles.container}>
			<main ref={textRef} className={styles.main} data-animate>
				blending design thinking with engineering to turn ideas into elegant digital products.
			</main>

			<footer ref={footerRef} className={styles.footer}>
				<a className={styles.contact_link_colored} href="/about-me">
					● my story
				</a>
			</footer>
		</div>
	);
};

export default AboutmeHome;
