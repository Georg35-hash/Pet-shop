import { useParams } from "react-router-dom";

import useProductStore from "../../src/zustand/stores/products.js";
import useCategoryStore from "../zustand/stores/categories";

import Filters from "../components/Filter/Filter";
import ProductCard from "../../src/components/ProductCard/ProductCard";
import SectionTitle from "../../src/components/SectionTitle/SectionTitle.jsx";
import NavigationRow from "../../src/components/NavRow/NavRow.jsx";

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
      />
      <section>
        <SectionTitle content={category ? category.title : "Loading..."} />
        <Filters products={products} />
        <div>
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
