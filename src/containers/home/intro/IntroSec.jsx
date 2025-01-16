import React, { useEffect } from "react";
import styles from "./style.module.css";
import { TbNorthStar } from "react-icons/tb";

const IntroSec = () => {
  useEffect(() => {}, []);

  return (
    <section className={styles.container}>
      <div className={styles.side_content}></div>
      <div className={styles.content}>
        <div className={styles.content_main}>
          <div className={styles.title}>
            <div className={styles.meet}>Hey, I'm</div>
            <div className={styles.name}>Hüseyin Canbay</div>
          </div>
          <div className={styles.desc}>
            Türkiye based Software Engineer passionate about Full Stack
            Development.
          </div>
        </div>
        <hr />
        <section className={styles.welcome_sec}>
          <div className={styles.welcome_title}>
            <div className={styles.icon}>
              <TbNorthStar />
            </div>
            <p className={styles.welcome_title_text}>
              Smart solutions for hard problems.
            </p>
          </div>
          <hr />
          <div className={styles.welcome_content}>
            <div className={styles.welcome_header}>ABOUT ME</div>
            <div className={styles.about_me}>
              I am a Software Engineer with a strong passion for technology. I
              consider myself a quick learner, disciplined and dedicated person.
              I thoroughly enjoy working with different technologies and
              exploring new possibilities in the world of software development.
              My goal is to contribute to innovative projects and create
              solutions that make a positive impact.
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default IntroSec;
