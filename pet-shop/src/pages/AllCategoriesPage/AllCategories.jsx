import styles from "../AllCategoriesPage/AllCategories.module.css";
import CategoryCard from "../../components/CategoryCard/CategoryCard.jsx";
import useCategoryStore from "../../zustand/stores/categories";
import NavigationRow from "../../components/NavRow/NavRow.jsx";
import SectionTitle from "../../components/SectionTitle/SectionTitle.jsx";
import LoadingErrorHandler from "../../components/LoadingErrorHandler/LoadingErrorHandler";

export default function AllCategories() {
  const { categories, loading, error } = useCategoryStore();

  return (
    <main>
      <LoadingErrorHandler loading={loading} error={error} />
      {!loading && !error && (
        <>
          <NavigationRow
            style={{
              width: "250px",
              maxWidth: "100%",
            }}
            buttons={[
              { text: "Main page", route: "/" },
              { text: "Categories", route: "/categories" },
            ]}
          />
          <section className={`${styles.bannerSection} hidden`}>
            <SectionTitle content="Categories" />
            <div className={styles.cards}>
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </section>
        </>
      )}
    </main>
  );
}
