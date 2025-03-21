import { useState } from "react";
import styles from "../Categories/Categories.module.css";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import useCategoryStore from "../../zustand/stores/categories";
import { CircularProgress, useMediaQuery } from "@mui/material";
import SectionTitle from "../SectionTitle/SectionTitle";
import NavigationButton from "../NavButton/NavButton";
import { Link, NavLink } from "react-router-dom";

export default function Categories() {
  const { categories, loading, error } = useCategoryStore();
  const [activeIndex, setActiveIndex] = useState(0);

  const xs = useMediaQuery("(max-width:600px)");
  const sm = useMediaQuery("(min-width:600px) and (max-width:900px)");
  const md = useMediaQuery("(min-width:900px) and (max-width:1200px)");

  const visibleCatSlide = xs ? 1 : sm ? 2 : md ? 3 : 4;

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + visibleCatSlide) % categories.length);
  };

  const prevSlide = () => {
    setActiveIndex(
      (prev) => (prev - visibleCatSlide + categories.length) % categories.length
    );
  };

  if (loading)
    return (
      <div style={{ display: "flex", justifyContent: "center", margin: 20 }}>
        <CircularProgress size="30px" />
      </div>
    );
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <section className={styles.coupleSection}>
      <div className={styles.coupleContainer}>
        <SectionTitle content="Categories" />
        <span className={styles.coupleLine}></span>
        <NavigationButton text="All categories" style={{ maxWidth: 140 }} />
      </div>

      <div className={styles.coupleSliderWrapper}>
        <KeyboardArrowLeft onClick={prevSlide} />

        <ul className={styles.coupleRenderList}>
          {categories
            .slice(activeIndex, activeIndex + visibleCatSlide)
            .map((category) => (
              <NavLink to="/categories" key={category.id}>
                <li className={styles.categoriesRenderItem}>
                  <img
                    className={styles.categoriesRenderImage}
                    src={`http://localhost:3333${category.image}`}
                    alt={category.title}
                  />
                  <p className={styles.categoriesDesc}>{category.title}</p>
                </li>
              </NavLink>
            ))}
        </ul>

        <KeyboardArrowRight onClick={nextSlide} />
      </div>
    </section>
  );
}
