import styles from "../SectionTitle/SectionTitle.module.css";
export default function SectionTitle({ content, style }) {
  return (
    <h2 className={styles.title} style={style}>
      {content}
    </h2>
  );
}
