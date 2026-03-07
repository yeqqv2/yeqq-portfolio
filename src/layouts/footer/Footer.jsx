import React from 'react';
import styles from './style.module.css';
// 1. Hook'u import et
import { useTranslation } from 'react-i18next';

const Footer = () => {
    // 2. t fonksiyonunu al
    const { t } = useTranslation();

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <header className={styles.logo}>[ yeqq ]</header>
                <section className={styles.links_container}>

                    <main className={styles.links}>
                        <div className={styles.links_header}>{t('footer.links_header')}</div>
                        <div className={styles.links_content}>
                            <a className={styles.link} href="/">
                                {t('footer.home')}
                            </a>
                            <a className={styles.link} href="/about-me">
                                {t('footer.about')}
                            </a>
                            <a className={styles.link} href="/manifest">
                                {t('footer.manifest')}
                            </a>
                            <a className={styles.link} href="/projects">
                                {t('footer.projects')}
                            </a>
                        </div>
                    </main>

                    <main className={styles.links}>
                        <div className={styles.links_header}>{t('footer.connect_header')}</div>
                        <div className={styles.links_content}>
                            <a
                                className={styles.link}
                                target="__blank"
                                href="https://www.instagram.com/1yunusewre"
                            >
                                instagram
                            </a>
                            <a
                                className={styles.link}
                                target="__blank"
                                href="https://github.com/yeqqv2"
                            >
                                github
                            </a>
                            <a
                                className={styles.link}
                                target="__blank"
                                href="https://tr.linkedin.com/in/yeqq"
                            >
                                linkedin
                            </a>
                        </div>
                    </main>

                    <main className={styles.links}>
                        <div className={styles.links_header}>{t('footer.contact_header')}</div>
                        <div className={styles.links_content}>
                            <a className={styles.link} href="/contact-me">
                                {t('footer.contact_btn')}
                            </a>
                        </div>
                    </main>
                </section>
            </div>
            <hr />
            <footer className={styles.footer}>
                {t('footer.signature')}
                {/* Yılı dinamik yapmak her zaman daha mantıklıdır */}
                © {new Date().getFullYear()}
            </footer>
        </div>
    );
};

export default Footer;