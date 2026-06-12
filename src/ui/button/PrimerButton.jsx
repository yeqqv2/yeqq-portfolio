import styles from "./style.module.css";

export default function PrimerButton({
  buttonText,
  color,
  backgroundColor,
  onClick,
  type = "button",
  ariaLabel,
}) {
  return (
    <button
      type={type}
      className={styles.button}
      style={{ color: color, backgroundColor: backgroundColor }}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {buttonText}
    </button>
  );
}
