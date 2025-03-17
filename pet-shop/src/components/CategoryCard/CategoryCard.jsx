import styles from "./CategoryCard.module.css";

export default function CategoryCard({ category }) {
  return (
    <div style={{ display: "flex" }}>
      <div className={styles.cardItem}>
        <a href={`/categories/${category.id}`}>
          <img
            src={`http://localhost:3333/${category.image}`}
            alt={category.title}
          />
          <span>{category.title}</span>
        </a>
      </div>
    </div>
  );
}
