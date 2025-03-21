import styles from "../Category/Category.module.css";
import { useParams } from "react-router-dom";
import useProductStore from "../../zustand/stores/products.js";
import useCategoryStore from "../../zustand/stores/categories.js";

import ProductCard from "../../components/ProductCard/ProductCard.jsx";
import SectionTitle from "../../components/SectionTitle/SectionTitle.jsx";
import NavigationRow from "../../components/NavRow/NavRow.jsx";

export default function Category() {
  const { categoryId } = useParams();
  const { byCategory, fetchProducts, products } = useProductStore();
  const categoryById = useCategoryStore((state) => state.fetchCategoryByID);

  if (!products.length) {
    fetchProducts();
  }

  const category = categoryById(Number(categoryId));

  const productsByCategory = byCategory(categoryId);

  return (
    <>
      <NavigationRow
        buttons={[
          { text: "Main page", route: "/" },
          { text: "Categories", route: "/categories" },
          {
            text: category ? category.title : "Loading...",
            route: `/categories/${categoryId}`,
          },
        ]}
        style={{ width: "400px", maxWidth: "100%" }}
      />
      <section>
        <SectionTitle content={category ? category.title : "Loading..."} />
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
  );
}
