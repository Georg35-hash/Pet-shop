import styles from "../styles/AllProducts.module.css";
import { useEffect, useState } from "react";
import Filter from "../components/Filter/Filter";
import useProductStore from "../zustand/stores/products";
import ProductCard from "../components/ProductCard/ProductCard";
import NavigationRow from "../components/NavRow/NavRow";
import SectionTitle from "../components/SectionTitle/SectionTitle";
import { CircularProgress } from "@mui/material";

export default function AllProducts() {
  const storeProducts = useProductStore((state) => state.products);

  const [products, setProducts] = useState(storeProducts);

  const { loading, error, fetchProducts } = useProductStore();

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts(); // Load categories when mont the page
    }
  }, [products, fetchProducts]);

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
          { text: "All products", route: "/products" },
        ]}
      />
      <section className={styles.products}>
        <SectionTitle content="All products" />
        <Filter products={products} setProducts={setProducts} />
        <div className={styles.cards}>
          {products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </section>
    </>
  );
}
