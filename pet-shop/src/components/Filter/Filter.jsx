import { useState } from "react";
import styles from "../Filter/Filter.module.css";
import CheckedIcon from "../../assets/all-products/checkbox-checked.svg";

function Filters({
  products,
  setProducts,
  features = { price: true, discounted: true, sorted: true },
}) {
  const [filters, setFilters] = useState({
    from: "",
    to: "",
    discounted: false,
    sorted: "1",
  });
  const [initialProducts] = useState(products);

  const applyFilters = (newFilters) => {
    let filteredProducts = [...initialProducts];

    const fromPrice = parseFloat(newFilters.from);
    const toPrice = parseFloat(newFilters.to);

    if (!isNaN(fromPrice)) {
      filteredProducts = filteredProducts.filter((product) => {
        const price = product.discont_price ?? product.price;
        return price >= fromPrice;
      });
    }

    if (!isNaN(toPrice)) {
      filteredProducts = filteredProducts.filter((product) => {
        const price = product.discont_price ?? product.price;
        return price <= toPrice;
      });
    }

    if (newFilters.discounted) {
      filteredProducts = filteredProducts.filter(
        (product) => product.discont_price
      );
    }

    switch (newFilters.sorted) {
      case "2":
        filteredProducts.sort(
          (a, b) => new Date(b.dateAdded) - new Date(a.dateAdded)
        );
        break;
      case "3":
        filteredProducts.sort(
          (a, b) => (b.discont_price ?? b.price) - (a.discont_price ?? a.price)
        );
        break;
      case "4":
        filteredProducts.sort(
          (a, b) => (a.discont_price ?? a.price) - (b.discont_price ?? b.price)
        );
        break;
      default:
        break;
    }

    setProducts(filteredProducts);
  };

  const handleChange = (event) => {
    const { id, value, type, checked } = event.target;
    const newFilters = {
      ...filters,
      [id]: type === "checkbox" ? checked : value,
    };
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  return (
    <form className={styles.filters}>
      {features.price && (
        <>
          <label htmlFor="from">Price</label>
          <input
            type="text"
            id="from"
            placeholder="from"
            value={filters.from}
            onChange={handleChange}
          />
          <input
            type="text"
            id="to"
            placeholder="to"
            value={filters.to}
            onChange={handleChange}
          />
        </>
      )}
      {features.discounted && (
        <>
          <label htmlFor="discounted">Discounted items</label>
          <input
            type="checkbox"
            id="discounted"
            checked={filters.discounted}
            onChange={handleChange}
          />
          {filters.discounted && (
            <img
              className={styles.checkboxIcon}
              src={CheckedIcon}
              alt="Checked"
            />
          )}
        </>
      )}
      {features.sorted && (
        <>
          <label htmlFor="sorted">Sorted</label>
          <select id="sorted" value={filters.sorted} onChange={handleChange}>
            <option value="1" disabled>
              by default
            </option>
            <option value="2">newest</option>
            <option value="3">price high-low</option>
            <option value="4">price low-high</option>
          </select>
        </>
      )}
    </form>
  );
}

export default Filters;
