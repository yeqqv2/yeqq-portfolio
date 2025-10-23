import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import styles from './style.module.css';
import projects from '../../../utils/projects';
import ContactHomePage from './../../home/contact/ContactHomePage';

const WorkPage = () => {
	const { name } = useParams();
	const work = projects.find((w) => w.link.includes(name));


	const imageFiles = work.images || [];


	return (
		<div className={styles.container}>
			<section className={styles.section}>
				<div className={styles.section_header}>
					[name]
				</div>
				<div className={styles.section_content}>
					<h1 className={styles.name}>
						{work.name}
					</h1>
					<h6 className={styles.company_name}>
						{work.company_name}
					</h6>
				</div>
			</section>
			<section className={styles.section}>
				<div className={styles.section_header}>
					[spot,description]
				</div>
				<div className={styles.section_content}>
					<h4 className={styles.desc}>
						{work.desc}
					</h4>
				</div>
			</section>
			<section className={styles.section}>
				<div className={styles.section_header}>
					[role]
				</div>
				<div className={styles.section_content}>
					<h4 className={styles.role}>
						{work.role}
					</h4>
				</div>
			</section>
			<section className={styles.section}>
				<div className={styles.section_header}>
					[gallery]
				</div>
				<div className={styles.brand_images}>
					{imageFiles.map((image, index) => (
						<div
							key={index}
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
			</section>
			{/* <section className={styles.section}>
				<div className={styles.section_header}>
					[achievements]
				</div>
				<div className={styles.ach_content}>
					{
						work.achievements.map((ach, index) => {
							return (
								<div className={styles.achievements} key={index}>
									<h1 className={styles.ach_number}>
										[ {ach.number} ]
									</h1>
									<div className={styles.section_context}>
										<h4 className={styles.ach_title}>
											{ach.title}
										</h4>
										<h6 className={styles.ach_desc}>
											{ach.desc}
										</h6>
									</div>
								</div>
							)
						})
					}
				</div>
			</section> */}
			{/* <div className={styles.main}>
				<div className={styles.brand_images}>
					{imageFiles.map((image, index) => (
						<div
							key={index}
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
			</div> */}
			{/* <ContactHomePage /> */}
		</div>
	);
};

export default WorkPage;
