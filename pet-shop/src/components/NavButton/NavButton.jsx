import styles from "../NavButton/NavButton.module.css";

export default function NavigationButton({
  text,
  route,
  isPrimary = false,
  style,
}) {
  const classes = `${styles.navigationButton} ${
    isPrimary ? styles.primary : ""
  }`;

  return (
    <a href={route} className={classes} style={style}>
      {text}
    </a>
  );
}
