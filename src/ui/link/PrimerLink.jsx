import { Link } from "react-router-dom";
import styles from "./style.module.css";

export default function PrimerLink({
  href,
  buttonText,
  color,
  backgroundColor,
  onClick,
}) {
  const isInternal = href?.startsWith("/");
  const commonProps = {
    className: styles.button,
    style: { color: color, backgroundColor: backgroundColor },
    onClick,
  };

  if (isInternal) {
    return (
      <Link to={href} {...commonProps}>
        {buttonText}
      </Link>
    );
  }

  return (
    <a
      href={href}
      {...commonProps}
    >
      {buttonText}
    </a>
  );
}
