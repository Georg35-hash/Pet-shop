import useProductStore from "../../src/zustand/stores/products";
import Filter from "../components/Filter/Filter";
import { useEffect } from "react";

export default function AllSales() {
  const { filteredDiscountedProducts, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Скидочные товары</h2>
      <Filter
        products={filteredDiscountedProducts}
        setFilteredProducts={() => {}}
        features={{ discounted: true }}
      />
      {filteredDiscountedProducts.map((product) => (
        <div key={product.id}>
          {product.name} - {product.discont_price} руб.
        </div>
      ))}
    </div>
  );
}
