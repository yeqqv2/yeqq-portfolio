import styles from "./style.module.css";

export default function BackstageIntro() {
  return (
    <div className={styles.container}>
      <div className={styles.background}>
        backstage
      </div>
      <div className={styles.stats}>
        <div className={styles.stat}>
          <h1 className={styles.stat_number}>26</h1>
          <div className={styles.stat_desc}>age / orbital cycles</div>
        </div>
        <div className={styles.stat}>
          <h1 className={styles.stat_number}>1800</h1>
          <div className={styles.stat_desc}>global chess elo</div>
        </div>
        <div className={styles.stat}>
          <h1 className={styles.stat_number}>14</h1>
          <div className={styles.stat_desc}>
            months of isolation / balıkesir
          </div>
        </div>
        <div className={styles.stat}>
          <h1 className={styles.stat_number}>99.9%</h1>
          <div className={styles.stat_desc}>system uptime</div>
        </div>
      </div>

      <div className={styles.line} />

      <div className={styles.stats}>
        <div className={styles.stat}>
          <h1 className={styles.stat_number}>0.8</h1>
          <div className={styles.stat_desc}>rationality / emotion ratio</div>
        </div>
        <div className={styles.stat}>
          <h1 className={styles.stat_number}>42</h1>
          <div className={styles.stat_desc}>psychology articles read</div>
        </div>
        <div className={styles.stat}>
          <h1 className={styles.stat_number}>0</h1>
          <div className={styles.stat_desc}>filters applied to truth</div>
        </div>
        <div className={styles.stat}>
          <h1 className={styles.stat_number}>72%</h1>
          <div className={styles.stat_desc}>current mental load</div>
        </div>
      </div>
    </div>
  );
}
