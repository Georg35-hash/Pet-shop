import styles from "../AllProducts/AllProducts.module.css";
import { useEffect } from "react";
import Filter from "../../components/Filter/Filter";
import useProductStore from "../../zustand/stores/products";
import ProductCard from "../../components/ProductCard/ProductCard";
import NavigationRow from "../../components/NavRow/NavRow";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import { CircularProgress } from "@mui/material";

export default function AllProducts() {
  const {
    products,
    filteredProducts,
    fetchProducts,
    setFilteredProducts,
    loading,
    error,
  } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", margin: 20 }}>
        <CircularProgress size="30px" />
      </div>
    );
  }

  if (error) {
    return <p style={{ color: "red" }}>Error: {error}</p>;
  }

  return (
    <>
      <NavigationRow
        style={{ width: "270px", maxWidth: "100%" }}
        buttons={[
          { text: "Main page", route: "/" },
          { text: "All products", route: "/products" },
        ]}
      />
      <section className={styles.products}>
        <SectionTitle content="All products" />
        <Filter products={products} setFilteredProducts={setFilteredProducts} />
        <div className={styles.cards}>
          {filteredProducts.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </section>
    </>
  );
}
