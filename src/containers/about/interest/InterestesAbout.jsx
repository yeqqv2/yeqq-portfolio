import React from 'react';
import styles from "./style.module.css";
import Carousel from '../../../components/carousel/Carousel';

const InterestesAbout = () => {
    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <Carousel />
            </div>
        </div>
    );
};

export default InterestesAbout;
