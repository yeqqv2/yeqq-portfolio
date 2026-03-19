import styles from "./style.module.css";

export default function UICheckbox({ name, onChange, checked }) {
  return (
    <label className={styles.switch}>
      <input
        className={styles.checkbox}
        type="checkbox"
        name={name}
        onChange={onChange}
        checked={checked}
      />
      <span className={styles.slider} />
    </label>
  );
}
