import React, { useState } from 'react';
import styles from './style.module.css';
import Slider from 'react-slick';

const colors = [
	{
		bg: 'var(--green300)',
		color: 'var(--wb950)',
	},
	{
		bg: 'var(--main-color300)',
		color: 'var(--wb950)',
	},
	{
		bg: 'var(--red600)',
		color: 'var(--wb50)',
	},
	{
		bg: 'var(--pink400)',
		color: 'var(--wb50)',
	},
	{
		bg: 'var(--darkblue700)',
		color: 'var(--wb50)',
	},
	{
		bg: 'var(--blue400)',
		color: 'var(--wb950)',
	},
	{
		bg: 'var(--orange600)',
		color: 'var(--wb50)',
	},
	{
		bg: 'var(--purple500)',
		color: 'var(--wb50)',
	},
];

const works = [
	{
		name: 'portfolyo',
		desc: 'Hüseyin Canbay adına yapılan portfolyo sitesidir.',
		img: '/assets/images/projects/canbay-portfolio.png',
		link: 'https://canbay-portfoli.vercel.app',
	},
	{
		name: 'kurumsal web sitesi',
		desc: 'Skynotech Akıllı Site Sistemleri firması adına yapılan kurumsal web sitesidir.',
		img: '/assets/images/projects/skynotech-ws.png',
		link: 'https://canbay-portfoli.vercel.app',
	},
	{
		name: 'kurumsal web sitesi',
		desc: 'Kurumsal web sitesi şablonudur.',
		img: '/assets/images/projects/dark-website.png',
		link: 'https://canbay-portfoli.vercel.app',
	},
	{
		name: 'kurumsal web sitesi, web uygulaması',
		desc: 'Balıkesir Planlama ve Kalkınma Ajansı Kurumsal web sitesi ve web uygulamasıdır.',
		img: '/assets/images/projects/bapka_0.png',
		link: 'https://bapka.tr',
	},
	{
		name: 'web uygulaması',
		desc: 'Skynotech Akıllı Site Sistemleri firması adına yapılan web uygulamasıdır.',
		img: '/assets/images/projects/mockup.png',
		link: 'https://canbay-portfoli.vercel.app',
	},
	{
		name: 'web uygulaması',
		desc: 'Balıkesir İstihdam Ofisi adına yapılan iş arama web uygulamasıdır.',
		img: '/assets/images/projects/bio_0.png',
		link: 'https://bio.balikesir.bel.tr',
	},
];

const settings = {
	dots: false,
	centerMode: true,
	infinite: true,
	variableWidth: true,
	slidesToShow: 1,
	slidesToScroll: 1,
	autoplay: true,
	speed: 3000,
	autoplaySpeed: 3000,
	pauseOnHover: true,
	swipeToSlide: true,
	rtl: true,
	touchMove: true,
	className: styles.slider,
};

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
			<div className={styles.content}>
				<header className={styles.header_title}>(projeler & işler)</header>
				<main className={styles.main}>
					<div className={styles.curvedWrapper}>
						<Slider {...settings}>
							{works.map((work, index) => (
								<a
									target="__blank"
									href={work.link}
									className={styles.card}
									key={index}
									onMouseEnter={handleMouseEnter}
									onMouseLeave={handleMouseLeave}
									onMouseMove={handleMouseMove}
									style={{ cursor: 'none' }}
								>
									<div className={styles.card_content}>
										<img className={styles.img} src={work.img} alt="me" />
										<div className={styles.desc}>
											<div className={styles.desc_title}>{work.name}</div>
											<div className={styles.desc_desc}>{work.desc}</div>
										</div>
									</div>
								</a>
							))}
						</Slider>
					</div>
				</main>
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
				● daha fazlasını gör
			</span>
		</div>
	);
};

export default WorksHomePage;
