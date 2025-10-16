import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import styles from './style.module.css';
import works from '../../../utils/works';
import ContactHomePage from './../../home/contact/ContactHomePage';
import gsap from 'gsap'; // GSAP içeri aktarıldı

const WorkPage = () => {
	const { name } = useParams();
	const work = works.find((w) => w.link.includes(name));

	const titleRef = useRef(null);
	const galleryRef = useRef(null); // Galeri için yeni ref

	useEffect(() => {
		if (!titleRef.current) return;

		// Metni kelimelere bölme işlemi
		const text = titleRef.current.textContent;
		const words = text.split(/\s+/).map(word => `<span class="${styles.wordContainer}"><span class="${styles.word}">${word}</span></span>`).join(' ');

		// Bölünmüş kelimeleri DOM'a yerleştirme
		titleRef.current.innerHTML = words;

		// Kelime öğelerini seçme
		const wordElements = titleRef.current.querySelectorAll(`.${styles.word}`);

		// Animasyon: Kelime kelime yukarıdan aşağıya (fade-in-down)
		gsap.fromTo(wordElements,
			{
				opacity: 0,
			},
			{
				opacity: 1,
				duration: 0.6,
				ease: 'power3.out',
				stagger: 0.05,
				delay: 0.2,
			}
		);

	}, [work.name]);

	useEffect(() => {
		if (!galleryRef.current) return;

		const images = galleryRef.current.querySelectorAll(`.${styles.galleryImage}`);

		gsap.fromTo(images,
			{ opacity: 0, y: 30 }, // Başlangıç durumu: gizli ve aşağıda
			{
				opacity: 1, y: 0, // Bitiş durumu: görünür ve normal pozisyonda
				duration: 0.3,
				ease: "power2.out",
				stagger: 0.1, // Görseller arasında 0.1 saniye gecikme
				scrollTrigger: {
					trigger: galleryRef.current, // Galeri kapsayıcısı tetikleyici
					start: "top 85%", // Galeri %85 viewport'a girince başla
					toggleActions: "play none none none",
				}
			}
		);
	}, [work.name]);


	const imageFiles = work.images || [];


	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.title} ref={titleRef}>{work.name}</div>
				<div className={styles.header_context}>
					<div className={styles.desc}>{work.desc}</div>
					<p className={styles.scroll}>[scroll]</p>
				</div>
			</div>
			<div className={styles.banner}>
				<img
					className={styles.banner_image}
					src={`${work.asset}/1.gif`}
					alt={work.name}
					loading="lazy"
				/>
			</div>
			<div className={styles.main}>
				<div className={styles.brand_images} ref={galleryRef}> {/* Galeri kapsayıcısına ref atandı */}
					{imageFiles.map((image, index) => (
						<div
							key={index}
							// 👈 Burada isWide özelliğine göre class ataması yapılır
							className={`${styles.galleryItem} ${image.isWide ? styles.isWide : ''}`}
						>
							<img
								className={styles.galleryImage}
								src={`${work.asset}/${image.file}`}
								alt={`${work.name} - Görsel ${index + 1}`}
								loading="lazy"
							/>
						</div>
					))}
				</div>
			</div>
			<ContactHomePage />
		</div>
	);
};

export default WorkPage;
