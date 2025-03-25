import { useState, useEffect } from "react";
import { Checkbox } from "@mui/material";
import styles from "../Filter/Filter.module.css";
import useProductStore from "../../zustand/stores/products";

export default function Filter({
  features = { price: true, discounted: true, sorted: true },
  onlyDiscounted = false,
}) {
  const [filters, setFilters] = useState({
    from: "",
    to: "",
    discounted: onlyDiscounted,
    sorted: "1",
  });

  const [message, setMessage] = useState("");

  const { products, setFilteredProducts } = useProductStore();

  useEffect(() => {
    applyFilters(filters);
  }, [filters, products]);

  const applyFilters = (newFilters) => {
    let filteredProducts = [...products];

    if (onlyDiscounted) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.discont_price !== null && product.discont_price !== undefined
      );
    }

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
        (product) =>
          product.discont_price !== null && product.discont_price !== undefined
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

    if (filteredProducts.length === 0) {
      setMessage("No filters.");
    } else {
      setMessage("");
    }

    setFilteredProducts(filteredProducts);
  };

  const handleChange = (event) => {
    const { id, value, type, checked } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <form className={styles.filters} onSubmit={(e) => e.preventDefault()}>
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
      {features.discounted && !onlyDiscounted && (
        <>
          <label htmlFor="discounted">Discounted items</label>
          <Checkbox
            id="discounted"
            checked={filters.discounted}
            onChange={handleChange}
            icon={
              <span
                style={{
                  width: 36,
                  height: 36,
                  display: "block",
                  borderRadius: 8,
                  border: "1px solid #dddddd",
                }}
              />
            }
            checkedIcon={
              <span
                style={{
                  width: 36,
                  height: 36,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 8,
                  backgroundColor: "#007BFF",
                  color: "white",
                }}
              >
                ✔
              </span>
            }
          />
        </>
      )}
      {features.sorted && (
        <>
          <label htmlFor="sorted">Sorted</label>
          <select id="sorted" value={filters.sorted} onChange={handleChange}>
            <option value="1">by default</option>
            <option value="2">newest</option>
            <option value="3">price high-low</option>
            <option value="4">price low-high</option>
          </select>
        </>
      )}
      {message && (
        <div>
          <p>{message}</p>
        </div>
      )}
    </form>
  );
}
