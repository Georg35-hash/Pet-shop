import { useState, useEffect } from "react";
import styles from "../Categories/Categories.module.css";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import useCategoryStore from "../../zustand/stores/categories";
import SectionTitle from "../SectionTitle/SectionTitle";
import NavigationButton from "../NavButton/NavButton";
import { NavLink } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import LoadingErrorHandler from "../../components/LoadingErrorHandler/LoadingErrorHandler";

export default function Categories() {
  const { categories, loading, error, fetchCategories } = useCategoryStore();
  const [activeIndex, setActiveIndex] = useState(0);
  const theme = useTheme();

  const xs = useMediaQuery("(max-width:600px)");
  const sm = useMediaQuery("(min-width:600px) and (max-width:900px)");
  const md = useMediaQuery("(min-width:900px) and (max-width:1200px)");

  const visibleCatSlide = xs ? 1 : sm ? 2 : md ? 3 : 4;

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + visibleCatSlide) % categories.length);
  };

  const prevSlide = () => {
    setActiveIndex(
      (prev) => (prev - visibleCatSlide + categories.length) % categories.length
    );
  };

  return (
    <section className={styles.coupleSection}>
      <LoadingErrorHandler loading={loading} error={error} />
      {!loading && !error && categories.length > 0 && (
        <>
          <div className={styles.coupleContainer}>
            <SectionTitle content="Categories" />
            <span className={styles.coupleLine}></span>
            <NavigationButton
              text="All categories"
              style={{ maxWidth: 140 }}
              route="/categories"
            />
          </div>

          <div className={styles.coupleSliderWrapper}>
            <KeyboardArrowLeft onClick={prevSlide} sx={{ cursor: "pointer" }} />

            <ul className={styles.coupleRenderList}>
              {categories
                .slice(activeIndex, activeIndex + visibleCatSlide)
                .map((category) => (
                  <NavLink to="/categories" key={category.id}>
                    <li className={styles.categoriesRenderItem}>
                      <img
                        className={styles.categoriesRenderImage}
                        src={`https://pet-shop-backend-0fzb.onrender.com${category.image}`}
                        alt={category.title}
                      />
                      <p
                        className={styles.categoriesDesc}
                        style={{ color: theme.palette.text.primary }}
                      >
                        {category.title}
                      </p>
                    </li>
                  </NavLink>
                ))}
            </ul>

            <KeyboardArrowRight
              onClick={nextSlide}
              sx={{ cursor: "pointer" }}
            />
          </div>
        </>
      )}
    </section>
  );
}
