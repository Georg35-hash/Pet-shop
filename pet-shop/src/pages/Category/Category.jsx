import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useProductStore from "../../zustand/stores/products.js";
import useCategoryStore from "../../zustand/stores/categories.js";
import ProductCard from "../../components/ProductCard/ProductCard.jsx";
import SectionTitle from "../../components/SectionTitle/SectionTitle.jsx";
import NavigationRow from "../../components/NavRow/NavRow.jsx";
import LoadingErrorHandler from "../../components/LoadingErrorHandler/LoadingErrorHandler";
import styles from "../Category/Category.module.css";

export default function Category() {
  const { categoryId } = useParams();
  const { byCategory, fetchProducts, products, loading, error } =
    useProductStore();
  const { fetchCategoryByID, fetchCategories } = useCategoryStore();

  const [category, setCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadCategory() {
      setIsLoading(true);
      console.log("Fetching category for ID:", categoryId);

      let data = await fetchCategoryByID(Number(categoryId));

      if (!data) {
        console.log("Category not found in Zustand, fetching categories...");
        await fetchCategories();
        data = await fetchCategoryByID(Number(categoryId));
      }

      console.log("Fetched category:", data);
      setCategory(data);
      setIsLoading(false);
    }

    loadCategory();
  }, [categoryId, fetchCategoryByID, fetchCategories]);

  useEffect(() => {
    if (!products.length) {
      fetchProducts();
    }
  }, [fetchProducts, products]);

  const productsByCategory = byCategory(categoryId);

  return (
    <main>
      <LoadingErrorHandler loading={loading || isLoading} error={error} />
      {!loading && !isLoading && !error && (
        <>
          <NavigationRow
            buttons={[
              { text: "Main page", route: "/" },
              { text: "Categories", route: "/categories" },
              {
                text: category ? category.title : "Not found",
                route: `/categories/${categoryId}`,
              },
            ]}
            style={{ width: "700px", maxWidth: "100%" }}
          />
          <section>
            <SectionTitle
              content={category ? category.title : "Title was not found"}
            />
            <div className={styles.cards}>
              {productsByCategory.length > 0 ? (
                productsByCategory.map((product) => (
                  <ProductCard product={product} key={product.id} />
                ))
              ) : (
                <p>{products.length ? "No products found." : "Loading..."}</p>
              )}
            </div>
          </section>
        </>
      )}
    </main>
  );
}
