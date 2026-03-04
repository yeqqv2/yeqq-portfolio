import React from "react";
import styles from "./style.module.css";
import AnimatedSplit from "../../components/animated split/AnimatedSplit";

export default function ProjectCreate() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.title}>create a new project</div>
        <div className={styles.desc}>
          fill in the details below to add a new case study to your portfolio.
        </div>
      </header>

      <form className={styles.form}>
        {/* SECTION 1: GENERAL INFO */}
        <div className={styles.section}>
          <h2 className={styles.section_title}>general information</h2>
          <div className={styles.grid}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>project name</label>
              <input
                type="text"
                className={styles.input}
                placeholder="e.g. Skynotech Smart Site"
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>company / client</label>
              <input
                type="text"
                className={styles.input}
                placeholder="e.g. Skynotech"
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>slug (url)</label>
              <input
                type="text"
                className={styles.input}
                placeholder="skynotech-smart-site"
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>tags (comma separated)</label>
              <input
                type="text"
                className={styles.input}
                placeholder="uiux, webapp, startup"
              />
            </div>
          </div>
        </div>

        {/* SECTION 2: TURKISH CONTENT */}
        <div className={styles.section}>
          <h2 className={styles.section_title}>content [tr]</h2>
          <div className={styles.grid}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>role [tr]</label>
              <input
                type="text"
                className={styles.input}
                placeholder="frontend geliştirici"
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>type [tr]</label>
              <input
                type="text"
                className={styles.input}
                placeholder="profesyonel"
              />
            </div>
            <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>short description [tr]</label>
              <textarea
                className={styles.textarea}
                rows="3"
                placeholder="Projenin kısa özeti..."
              ></textarea>
            </div>
            <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>full overview [tr]</label>
              <textarea
                className={styles.textarea}
                rows="5"
                placeholder="Projenin detaylı incelemesi..."
              ></textarea>
            </div>
          </div>
        </div>

        {/* SECTION 3: ENGLISH CONTENT */}
        <div className={styles.section}>
          <h2 className={styles.section_title}>content [en]</h2>
          <div className={styles.grid}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>role [en]</label>
              <input
                type="text"
                className={styles.input}
                placeholder="frontend developer"
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>type [en]</label>
              <input
                type="text"
                className={styles.input}
                placeholder="professional"
              />
            </div>
            <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>short description [en]</label>
              <textarea
                className={styles.textarea}
                rows="3"
                placeholder="Short summary of the project..."
              ></textarea>
            </div>
            <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>full overview [en]</label>
              <textarea
                className={styles.textarea}
                rows="5"
                placeholder="Detailed overview of the project..."
              ></textarea>
            </div>
          </div>
        </div>

        {/* SECTION 4: MEDIA */}
        <div className={styles.section}>
          <h2 className={styles.section_title}>4. media</h2>
          <div className={styles.grid}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>banner image</label>
              <input
                type="file"
                className={styles.fileInput}
                accept="image/*"
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>gallery images (multiple)</label>
              <input
                type="file"
                className={styles.fileInput}
                accept="image/*"
                multiple
              />
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <button type="submit" className={styles.submitBtn}>
            create project
          </button>
        </div>
      </form>
    </div>
  );
}
