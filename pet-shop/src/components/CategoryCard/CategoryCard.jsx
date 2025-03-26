import styles from "./CategoryCard.module.css";
import { useTheme } from "@mui/material/styles";

export default function CategoryCard({ category }) {
  const theme = useTheme();
  return (
    <div style={{ display: "flex" }}>
      <div className={styles.cardItem}>
        <a href={`/categories/${category.id}`}>
          <img
            src={`http://localhost:3333/${category.image}`}
            alt={category.title}
          />
          <span style={{ color: theme.palette.text.primary }}>
            {category.title}
          </span>
        </a>
      </div>
    </div>
  );
}
