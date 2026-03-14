import styles from "./style.module.css";
import AnimatedSplit from '@/components/animated split/AnimatedSplit';

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <AnimatedSplit
                text="please login & start add / edit / delete somethin"
                className={styles.header}
                tagName="span"
                stagger={0.03}
                duration={1.5}
                start="top 80%"
            />
        </div>
        <div className={styles.main}>
          <div className={styles.input_group}>
            <label className={styles.label} htmlFor="username">
              username
            </label>
            <input
              className={styles.input}
              name="username"
              type="text"
              placeholder="username"
            />
          </div>
          <div className={styles.input_group}>
            <label className={styles.label} htmlFor="password">
              password
            </label>
            <input
              className={styles.input}
              name="password"
              type="password"
              placeholder="password"
            />
          </div>
          <button type="submit" className={styles.button}>
            giriş yap
          </button>
        </div>
      </div>
    </div>
  );
}
