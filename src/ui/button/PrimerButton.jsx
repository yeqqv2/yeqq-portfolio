import styles from "./style.module.css";

export default function PrimerButton({
  buttonText,
  color,
  backgroundColor,
  onClick,
}) {
  return (
    <button
      className={styles.button}
      style={{ color: color, backgroundColor: backgroundColor }}
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
}
