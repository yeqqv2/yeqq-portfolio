import styles from "./style.module.css";

export default function UiInput({
  name,
  type,
  placeholder,
  onChange,
  required,
}) {
  return (
    <input
      className={styles.input}
      name={name}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      required={required}
    />
  );
}
