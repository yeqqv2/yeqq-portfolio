import React from "react";
import styles from "./style.module.css";

const ContactHomePage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.context}>
        Herhangi bir yazılım fikrin mi var?
        <br /> Hemen (<span className={styles.contact}>iletişime geç</span>)
      </div>
    </div>
  );
};

export default ContactHomePage;
