import styles from "../AllProducts/AllProducts.module.css";
import Filter from "../../components/Filter/Filter";
import useProductStore from "../../zustand/stores/products";
import ProductCard from "../../components/ProductCard/ProductCard";
import NavigationRow from "../../components/NavRow/NavRow";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import LoadingErrorHandler from "../../components/LoadingErrorHandler/LoadingErrorHandler";

export default function AllProducts() {
  const { products, filteredProducts, setFilteredProducts, loading, error } =
    useProductStore();

  return (
    <main>
      <LoadingErrorHandler loading={loading} error={error} />
      {!loading && !error && (
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
            <Filter
              products={products}
              setFilteredProducts={setFilteredProducts}
            />
            <div className={styles.cards}>
              {filteredProducts.map((product) => (
                <ProductCard product={product} key={product.id} />
              ))}
            </div>
          </section>
        </>
      )}
    </main>
  );
}
