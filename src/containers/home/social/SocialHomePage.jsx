import React from "react";
import styles from "./style.module.css";

const social = [
  {
    name: styles.instagram,
    icon: "/assets/images/social/instagram.svg",
    link: "https://www.instagram.com/yeqqv2",
    images: [
      "/assets/images/social/instagram/1.jpeg",
      "/assets/images/social/instagram/2.jpeg",
      "/assets/images/social/instagram/3.jpeg",
    ],
  },
  {
    name: styles.spotify,
    icon: "/assets/images/social/spotify.svg",
    link: "https://open.spotify.com/user/31a57fofqupd43f6m47aevi5q3ey?si=DNNsAlN2Q6qNKQh0cTjD4w",
    images: [
      "/assets/images/social/spotify/1.png",
      "/assets/images/social/spotify/2.png",
      "/assets/images/social/spotify/3.png",
    ],
  },
  {
    name: styles.letterboxd,
    icon: "/assets/images/social/letterboxd.svg",
    link: "https://letterboxd.com/yeqq/",
    images: [
      "/assets/images/social/letterboxd/1.png",
      "/assets/images/social/letterboxd/2.png",
      "/assets/images/social/letterboxd/3.png",
    ],
  },
  {
    name: styles.github,
    icon: "/assets/images/social/github.svg",
    link: "https://github.com/yeqqv2",
    images: [
      "/assets/images/social/github/1.png",
      "/assets/images/social/github/2.png",
      "/assets/images/social/github/3.png",
    ],
  },
  {
    name: styles.dribbble,
    icon: "/assets/images/social/dribbble.svg",
    link: "https://dribbble.com/yeqqv2",
    images: [
      "/assets/images/social/dribbble/1.png",
      "/assets/images/social/dribbble/2.png",
      "/assets/images/social/dribbble/3.png",
    ],
  },
];

const SocialHomePage = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.header_title}>(sosyal medya 👌)</div>
      </header>
      <main className={styles.main}>
        {social.map((item, index) => {
          return (
            <div key={index} className={styles.social}>
              <a
                href={item.link}
                target="_blank"
                className={`${styles.social_card} ${item.name}`}
                rel="noopener noreferrer"
              >
                <img
                  className={styles.social_icon}
                  src={item.icon}
                  alt="social"
                />
              </a>
              {item.images.map((image, index) => {
                return (
                  <div key={index} className={styles.social_card}>
                    <img className={styles.img} src={image} alt="social" />
                  </div>
                );
              })}
            </div>
          );
        })}
      </main>
    </div>
  );
};

export default SocialHomePage;
