import styles from "../AllCategoriesPage/AllCategories.module.css";
import CategoryCard from "../../components/CategoryCard/CategoryCard.jsx";
import { useEffect } from "react";
import { CircularProgress } from "@mui/material";
import useCategoryStore from "../../zustand/stores/categories";
import NavigationRow from "../../components/NavRow/NavRow.jsx";
import SectionTitle from "../../components/SectionTitle/SectionTitle.jsx";

export default function AllCategories() {
  const { categories, loading, error, fetchCategories } = useCategoryStore();

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
        style={{ width: "250px", maxWidth: "100%" }}
        buttons={[
          { text: "Main page", route: "/" },
          { text: "Categories", route: "/categories" },
        ]}
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
