import React from "react";
import styles from "./style.module.css";

const WorksHomePage = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.header_title}>WORKS & PROJECTS</div>
        <div className={styles.header_desc}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
          quibusdam amet qui quidem magni incidunt accusamus autem nisi,
          deserunt doloribus odit labore possimus beatae vero quaerat modi,
          voluptate, aut consectetur nostrum iure? A, itaque ad modi magni
          voluptate voluptatem, dolores vitae, veniam delectus fuga laboriosam
          blanditiis nostrum consectetur non mollitia!
        </div>
      </header>
      <hr />
      <main className={styles.main}>
        <div className={`${styles.project_1} ${styles.card}`}>
          <div className={styles.card_header}>
            <div className={styles.card_header_title}>
              Balıkesir İstihdam Ofisi
            </div>
            <div className={styles.card_header_desc}>
              Balıkesir İstihdam Ofisi, geniş kapsamlı bir iş arama, iş ilanı
              verme ve veri raporlama uygulamasıdır. Uygulamamızda pdf
              oluşturma, verilerden rapor oluşturma, sms doğrulama gibi
              hizmetler kullanılarak, uygulama zenginleştirilmiştir.
            </div>
          </div>
          <img
            className={styles.card_img}
            src="/assets/images/projects/bio_0.png"
            alt="Balıkesir İstihdam Ofisi"
          />
          <img
            className={styles.card_img}
            src="/assets/images/projects/bio_2.png"
            alt="Balıkesir İstihdam Ofisi"
          />
          <img
            className={styles.card_img}
            src="/assets/images/projects/bio_1.png"
            alt="Balıkesir İstihdam Ofisi"
          />
        </div>
        <div className={`${styles.project_2} ${styles.card}`}>
          <div className={styles.card_header}>
            <div className={styles.card_header_title}>
              Balıkesir Planlama ve Kalkınma Ajansı Kurumsal Web Uygulaması
            </div>
            <div className={styles.card_header_desc}>
              Balıkesir Planlama ve Kalkınma Ajansı Kurumsal Web Uygulaması, hem
              bir kurumsal kimlik hem de bir raporlama uygulamasıdır. Bu
              uygulamada Balıkesir ile ilgili anonim veriler, bu verilerin
              işlenmesi ve istatistik tutulması sağlanmaktadır.
            </div>
          </div>
          <img
            className={styles.card_img_2}
            src="/assets/images/projects/bapka_0.png"
            alt="Balıkesir Planlama ve Kalkınma Ajansı"
          />
        </div>
        <div className={`${styles.project_3} ${styles.card}`}>
          <div className={styles.card_header}>
            <div className={styles.card_header_title}>
              Yirmibeş Yazılım | ERP Web Uygulaması
            </div>
            <div className={styles.card_header_desc}>
              Yirmibeş Yazılım'ın ERP web uygulaması, satın alma, satış,
              ihracat, finans, cash, depo, üretim, rapor ve B2B modüllerinden
              oluşan bir web tabanlı yazılım uygulamasıdır.
            </div>
          </div>
          <img
            className={styles.card_img_3}
            src="/assets/images/projects/yirmibes_0.png"
            alt="Yirmibeş Yazılım"
          />
          <img
            className={styles.card_img_3}
            src="/assets/images/projects/yirmibes_1.png"
            alt="Yirmibeş Yazılım"
          />
          <img
            className={styles.card_img_3}
            src="/assets/images/projects/yirmibes_2.png"
            alt="Yirmibeş Yazılım"
          />
          <img
            className={styles.card_img_3}
            src="/assets/images/projects/yirmibes_3.png"
            alt="Yirmibeş Yazılım"
          />
          <img
            className={styles.card_img_3}
            src="/assets/images/projects/yirmibes_4.png"
            alt="Yirmibeş Yazılım"
          />
          <img
            className={styles.card_img_3}
            src="/assets/images/projects/yirmibes_5.png"
            alt="Yirmibeş Yazılım"
          />
        </div>
        <div className={styles.project_4}>
          <div className={styles.card_header}>
            <div className={styles.card_header_title}>
              Web Tabanlı Emlak Uygulaması (API)
            </div>
            <div className={styles.card_header_desc}>
              Emlak uygulaması; müşteri yönetimi, satış yönetimi, pazarlama
              yönetimi, müşteri hizmetleri ve destek talepleri, döküman
              yönetimi, raporlama ve analiz, görev ve takip yönetimi ve
              entegrasyon katmanlarından oluşan bir web tabanlı uygulamadır.
            </div>
          </div>
          <video
            className={styles.vid}
            src="/assets/videos/code-horizontal.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
      </main>
    </div>
  );
};

export default WorksHomePage;
