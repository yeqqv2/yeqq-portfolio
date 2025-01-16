import React from "react";
import styles from "./style.module.css";
import { FaCode } from "react-icons/fa";
import { FaCodeBranch } from "react-icons/fa";
import { FaCodeMerge } from "react-icons/fa6";
import { FaCodePullRequest } from "react-icons/fa6";
import { LiaLaptopCodeSolid } from "react-icons/lia";
import { AiOutlineCode } from "react-icons/ai";
import { LuCodepen } from "react-icons/lu";
import { FaCodeCommit } from "react-icons/fa6";
import { IoQrCodeOutline } from "react-icons/io5";
import { IoCodeWorking } from "react-icons/io5";

export default function CodeBG() {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <span className={`${styles.icon} ${styles.icon_1}`}>
          <FaCode />
        </span>
        <span className={`${styles.icon} ${styles.icon_2}`}>
          <FaCodeMerge />
        </span>
        <span className={`${styles.icon} ${styles.icon_3}`}>
          <IoQrCodeOutline />
        </span>
        <span className={`${styles.icon} ${styles.icon_4}`}>
          <FaCodePullRequest />
        </span>
        <span className={`${styles.icon} ${styles.icon_5}`}>
          <LiaLaptopCodeSolid />
        </span>
        <span className={`${styles.icon} ${styles.icon_6}`}>
          <AiOutlineCode />
        </span>
        <span className={`${styles.icon} ${styles.icon_7}`}>
          <LuCodepen />
        </span>
        <span className={`${styles.icon} ${styles.icon_8}`}>
          <FaCodeCommit />
        </span>
        <span className={`${styles.icon} ${styles.icon_9}`}>
          <FaCodeBranch />
        </span>
        <span className={`${styles.icon} ${styles.icon_10}`}>
          <IoCodeWorking />
        </span>
      </div>
      <div className={styles.right}>
        <span className={`${styles.icon} ${styles.icon_1}`}>
          <FaCode />
        </span>
        <span className={`${styles.icon} ${styles.icon_2}`}>
          <FaCodeMerge />
        </span>
        <span className={`${styles.icon} ${styles.icon_3}`}>
          <IoQrCodeOutline />
        </span>
        <span className={`${styles.icon} ${styles.icon_4}`}>
          <FaCodePullRequest />
        </span>
        <span className={`${styles.icon} ${styles.icon_5}`}>
          <LiaLaptopCodeSolid />
        </span>
        <span className={`${styles.icon} ${styles.icon_6}`}>
          <AiOutlineCode />
        </span>
        <span className={`${styles.icon} ${styles.icon_7}`}>
          <LuCodepen />
        </span>
        <span className={`${styles.icon} ${styles.icon_8}`}>
          <FaCodeCommit />
        </span>
        <span className={`${styles.icon} ${styles.icon_9}`}>
          <FaCodeBranch />
        </span>
        <span className={`${styles.icon} ${styles.icon_10}`}>
          <IoCodeWorking />
        </span>
      </div>
    </div>
  );
}
