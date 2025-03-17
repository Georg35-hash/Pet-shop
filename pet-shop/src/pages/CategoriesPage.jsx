import styles from "../styles/AllCategories.module.css";
import useCategoriesStore from "../../src/zustand/stores/categories.js";
import CategoryCard from "../components/CategoryCard/CategoryCard.jsx";
import SectionTitle from "../components/SectionTitle/SectionTitle.jsx";
import NavigationRow from "../components/NavRow/NavRow.jsx";
import { useEffect } from "react";
import { CircularProgress } from "@mui/material";

export default function CategoriesPage() {
  const { categories, loading, error, fetchCategories } = useCategoriesStore();
  useEffect(() => {
    if (categories.length === 0) {
      fetchCategories(); // Load categories when mont the page
    }
  }, [categories, fetchCategories]);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", margin: 20 }}>
        <CircularProgress size="30px" />
      </div>
    );
  }

  if (error) {
    <p style={{ color: "red" }}>Error: {error}</p>;
  }

  return (
    <>
      <NavigationRow
        buttons={[
          { text: "Main page", route: "/" },
          { text: "Categories", route: "/categories" },
        ]}
        style={{ maxWidth: 200 }}
      />
      <section className={styles.categories}>
        <SectionTitle content="Categories" />
        <div className={styles.cards}>
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>
    </>
  );
}
