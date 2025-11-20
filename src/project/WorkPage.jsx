import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import styles from "./style.module.css";
import projects from "../../../utils/projects";
import AnimatedSplit from './../../../components/animated split/AnimatedSplit';

gsap.registerPlugin(CustomEase, ScrollTrigger);
CustomEase.create("hop", "0, 0, 0.1, 1");

export default function WorkSinglePage() {
	const { slug } = useParams();

	const work = projects.find((p) => p.link === `/projects/${slug}`);

	// compute next project (wraps to first if current is last)
	const currentIndex = projects.findIndex((p) => p.link === `/projects/${slug}`);
	const nextProject =
		currentIndex === -1
			? null
			: projects[(currentIndex + 1) % projects.length];

	// facts and gallery refs remain for non-text animations
	const factsRef = useRef(null);
	const galleryRefs = useRef([]);

	useEffect(() => {
		// If there are no facts/galleries, still proceed to avoid blocking text animations (AnimatedSplit handles text)
		const ctx = gsap.context(() => {
			// Facts reveal (children are AnimatedSplit wrappers now)
			if (factsRef.current) {
				gsap.from(factsRef.current.children, {
					opacity: 0,
					y: 20,
					stagger: 0.1,
					duration: 0.8,
					ease: "hop",
					scrollTrigger: {
						trigger: factsRef.current,
						start: "top 90%",
					},
				});
			}

			// Gallery items clip-path reveal
			galleryRefs.current.forEach((el) => {
				if (!el) return;

				gsap.fromTo(
					el,
					{ clipPath: "inset(100% 0% 0% 0%)" },
					{
						clipPath: "inset(0% 0% 0% 0%)",
						duration: 1.5,
						ease: "hop",
						scrollTrigger: {
							trigger: el,
							start: "top 80%",
						},
					}
				);
			});
		});

		return () => ctx.revert();
	}, []);

	// Eğer proje bulunamazsa
	if (!work) {
		return (
			<div className={styles.container}>
				<section className={styles.hero}>
					<AnimatedSplit className={styles.title} text="Project not found" />
					<a href="/works">
						<AnimatedSplit text="← back to works" />
					</a>
				</section>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			{/* HERO */}
			<section className={styles.hero}>
				<img
					className={styles.hero_image}
					src={`${work.asset}/${work.banner}`}
					alt={work.name || work.project_name}
					aria-hidden="true"
					loading="lazy"
					decoding="async"
				/>
				<div className={styles.hero_context}>
					<div className={styles.hero_header}>
						<AnimatedSplit
							className={styles.title}
							text={work.name || work.project_name}
							tagName="span"
							stagger={0.03}
							duration={1.5}
							start="top 80%"
						/>

						<AnimatedSplit
							className={styles.subtitle}
							text={work.desc || work.company_name}
							tagName="span"
							stagger={0.03}
							duration={1.5}
							start="top 80%"
						/>
					</div>
					<section className={styles.facts} ref={factsRef}>
						<div className={styles.fact}>
							<AnimatedSplit
								className={styles.factLabel}
								text="[company]"
								tagName="span"
								stagger={0.03}
								duration={1.5}
								start="top 80%"
							/>
							<AnimatedSplit
								className={styles.factValue}
								text={work.company_name}
								tagName="span"
								stagger={0.03}
								duration={1.5}
								start="top 80%"
							/>
						</div>

						<div className={styles.fact}>
							<AnimatedSplit
								className={styles.factLabel}
								text="[role]"
								tagName="span"
								stagger={0.03}
								duration={1.5}
								start="top 80%"
							/>
							<AnimatedSplit
								className={styles.factValue}
								text={work.role || "UI/UX Designer & Developer"}
								tagName="span"
								stagger={0.03}
								duration={1.5}
								start="top 80%"
							/>
						</div>

						<div className={styles.fact}>
							<AnimatedSplit
								className={styles.factLabel}
								text="[type]"
								tagName="span"
								stagger={0.03}
								duration={1.5}
								start="top 80%"
							/>
							<AnimatedSplit
								className={styles.factValue}
								text={work.type || "Web Application"}
								tagName="span"
								stagger={0.03}
								duration={1.5}
								start="top 80%"
							/>
						</div>

						<div className={styles.fact}>
							<AnimatedSplit
								className={styles.factLabel}
								text="[tech]"
								tagName="span"
								stagger={0.03}
								duration={1.5}
								start="top 80%"
							/>
							<AnimatedSplit
								className={styles.factValue}
								text={work.tech?.join(", ") || "React, JavaScript, Figma"}
								tagName="span"
								stagger={0.03}
								duration={1.5}
								start="top 80%"
							/>
						</div>
					</section>
				</div>
			</section>

			{/* OVERVIEW */}
			<section className={styles.overview}>
				<AnimatedSplit
					className={styles.sectionTitle}
					text="[overview]"
					tagName="span"
					stagger={0.03}
					duration={1.5}
					start="top 80%"
				/>
				<AnimatedSplit
					className={styles.overviewText}
					text={
						work.fullOverview ||
						"Modern, scalable and accessible interfaces designed for real users."
					}
					tagName="span"
					stagger={0.03}
					duration={1.5}
					start="top 80%"
				/>
			</section>

			{/* ACHIEVEMENTS */}
			{work.achievements && work.achievements.length > 0 && (
				<section className={styles.achievements}>
					<AnimatedSplit
						className={styles.sectionTitle}
						text="[achievements]"
						tagName="span"
						stagger={0.03}
						duration={1.5}
						start="top 80%"
					/>
					<ul className={styles.achievements_list}>
						{work.achievements.map((a, i) => (
							<li key={i} className={styles.achievement}>
								{/* number */}
								<AnimatedSplit
									className={styles.achNumber}
									text={a.number}
									tagName="span"
									stagger={0.03}
									duration={1.5}
									start="top 80%"
								/>
								<div className={styles.achievement_context}>
									{/* title */}
									<AnimatedSplit
										className={styles.achTitle}
										text={a.title}
										tagName="span"
										stagger={0.03}
										duration={1.5}
										start="top 80%"
									/>
									{/* desc */}
									<AnimatedSplit
										className={styles.achDesc}
										text={a.desc}
										tagName="span"
										stagger={0.03}
										duration={1.5}
										start="top 80%"
									/>
								</div>
							</li>
						))}
					</ul>
				</section>
			)}

			{/* GALLERY */}
			{work.images && work.images.length > 0 && (
				<section className={styles.gallery}>
					{work.images.map((img, i) => (
						<div
							key={i}
							className={`${styles.galleryItem} ${img.isWide ? styles.wide : ""}`}
							ref={(el) => (galleryRefs.current[i] = el)}
						>
							<img
								src={`${work.asset}/${img.file}`}
								alt={img.alt || ""}
								aria-hidden="true"
								loading="lazy"
								decoding="async"
							/>
						</div>
					))}
				</section>
			)}

			{/* CONCLUSION */}
			<section className={styles.conclusion}>
				<AnimatedSplit
					className={styles.sectionTitle}
					text="[conclusion]"
					tagName="span"
					stagger={0.03}
					duration={1.5}
					start="top 80%"
				/>
				<AnimatedSplit
					className={styles.conclusionText}
					text={
						"this project allowed me to combine clean ui principles, fast development practices and modern motion design—while solving real-world problems for real users."
					}
					tagName="span"
					stagger={0.03}
					duration={1.5}
					start="top 80%"
				/>
			</section>

			{/* CTA / navigation */}
			<footer className={styles.next}>
				<a href="/projects" className={styles.button}>
					<AnimatedSplit
						text="● back to works"
						tagName="span"
						stagger={0.03}
						duration={1.5}
						start="top 80%"
					/>
				</a>

				{/* Next project link — uses computed nextProject, falls back to /projects */}
				<a href={nextProject?.link || "/projects"}>
					<AnimatedSplit
						text={`${nextProject?.project_name} ●` || "next project"}
						className={styles.button}
						tagName="span"
						stagger={0.03}
						duration={1.5}
						start="top 80%"
					/>
				</a>
			</footer>
		</div>
	);
}