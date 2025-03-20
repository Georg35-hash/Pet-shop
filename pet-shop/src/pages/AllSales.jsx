import { useEffect } from "react";
import styles from "../../src/styles/AllSales.module.css";

import useProductsStore from "../../src/zustand/stores/products.js";

import Filters from "../components/Filter/Filter";
import ProductCard from "../../src/components/ProductCard/ProductCard";
import SectionTitle from "../../src/components/SectionTitle/SectionTitle.jsx";
import NavigationRow from "../../src/components/NavRow/NavRow.jsx";

export default function AllSales() {
  const { discounted, filteredProducts, setFilteredProducts } =
    useProductsStore();

  useEffect(() => {
    setFilteredProducts(discounted()); // Загружаем товары с учетом скидок при монтировании
  }, []);

  return (
    <>
      <NavigationRow
        buttons={[
          { text: "Main Page", route: "/" },
          { text: "All Sales", route: "/sales" },
        ]}
      />
      <section className={styles.sales}>
        <SectionTitle content="Discounted Items" />
        <Filters
          features={{ price: true, sorted: true }}
          onlyDiscounted={true}
        />
        <div className={styles.cards}>
          {filteredProducts.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </section>
    </>
  );
}
