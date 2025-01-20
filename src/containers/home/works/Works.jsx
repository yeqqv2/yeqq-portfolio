import React from "react";
import styles from "./style.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const works = [
  {
    name: "(portfolyo)",
    desc: "Hüseyin Canbay adına yapılan portfolyo sitesidir.",
    img: "/assets/images/projects/canbay-portfolio.png",
    link: "https://canbay-portfoli.vercel.app",
  },
  {
    name: "(kurumsal webs sitesi)",
    desc: "Skynotech Akıllı Site Sistemleri firması adına yapılan kurumsal web sitesidir.",
    img: "/assets/images/projects/skynotech-ws.png",
    link: "https://canbay-portfoli.vercel.app",
  },
  {
    name: "(kurumsal webs sitesi)",
    desc: "Kurumsal web sitesi şablonudur.",
    img: "/assets/images/projects/dark-website.png",
    link: "https://canbay-portfoli.vercel.app",
  },
  {
    name: "(kurumsal webs sitesi, web uygulaması)",
    desc: "Balıkesir Planlama ve Kalkınma Ajansı Kurumsal web sitesi ve web uygulamasıdır.",
    img: "/assets/images/projects/bapka_0.png",
    link: "https://bapka.tr",
  },
  {
    name: "(web uygulaması)",
    desc: "Skynotech Akıllı Site Sistemleri firması adına yapılan web uygulamasıdır.",
    img: "/assets/images/projects/mockup.png",
    link: "https://canbay-portfoli.vercel.app",
  },
  {
    name: "(web uygulaması)",
    desc: "Balıkesir İstihdam Ofisi adına yapılan iş arama web uygulamasıdır.",
    img: "/assets/images/projects/bio_0.png",
    link: "https://bio.balikesir.bel.tr",
  },
];

const settings = {
  dots: false,
  className: styles.slider,
  centerMode: true,
  infinite: true,
  variableWidth: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  speed: 3000,
  autoplaySpeed: 3000,
  centerPadding: "10vh",
  pauseOnHover: true,
  swipeToSlide: true,
  rtl: true,
};

const WorksHomePage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <header className={styles.header_title}>(projeler & işler)</header>
        <main className={styles.main}>
          <Slider {...settings}>
            {works.map((work, index) => (
              <a
                target="__blank"
                href={work.link}
                className={styles.card}
                key={index}
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
        </main>
      </div>
    </div>
  );
};

export default WorksHomePage;
