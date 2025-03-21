import styles from "../AllSales/AllSales.module.css";
import useProductsStore from "../../zustand/stores/products.js";
import Filters from "../../components/Filter/Filter.jsx";
import ProductCard from "../../components/ProductCard/ProductCard.jsx";
import SectionTitle from "../../components/SectionTitle/SectionTitle.jsx";
import NavigationRow from "../../components/NavRow/NavRow.jsx";
import LoadingErrorHandler from "../../components/LoadingErrorHandler/LoadingErrorHandler";

export default function AllSales() {
  const { filteredProducts, loading, error } = useProductsStore();

  return (
    <main>
      <LoadingErrorHandler loading={loading} error={error} />

      {!loading && !error && (
        <>
          <NavigationRow
            buttons={[
              { text: "Main Page", route: "/" },
              { text: "All Sales", route: "/sales" },
            ]}
          />
          <section className={`${styles.sales} hidden`}>
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
      )}
    </main>
  );
}
