import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import Button from "../components/Button/Button";
import NavigationRow from "../components/NavRow/NavRow";
import useShoppingCartStore from "../zustand/stores/shoppingCart";
import useProductsStore from "../zustand/stores/products";
import useCategoryStore from "../zustand/stores/categories";
import styles from "../styles/ProductPage.module.css";

function ProductPage() {
  const { productId } = useParams();
  const { fetchProductById, product, loading, error } = useProductsStore();
  const categoryById = useCategoryStore((state) => state.byId);
  const push = useShoppingCartStore((state) => state.push);
  const updateQuantity = useShoppingCartStore((state) => state.updateQuantity);
  const incrementCount = useShoppingCartStore((state) => state.incrementCount);
  const decrementCount = useShoppingCartStore((state) => state.decrementCount);
  const [isTextShortened, setTextShortened] = useState(true);
  const maxShortenedLength = 700;

  const fetchProduct = useCallback(() => {
    fetchProductById(productId);
  }, [fetchProductById, productId]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  if (loading) return <CircularProgress />;
  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>Good is not found</p>;

  const category = categoryById?.[product.categoryId] || null;

  const appendEllipsis = (text) =>
    text && text.length > maxShortenedLength
      ? text.slice(0, maxShortenedLength).trim() + "..."
      : text;

  const hasDiscount =
    product.discont_price !== null && product.discont_price < product.price;

  return (
    <>
      <NavigationRow
        buttons={[
          { text: "Main Page", route: "/", key: "main" },
          { text: "Categories", route: "/categories", key: "categories" },
          {
            text: category?.title || "Category",
            route: `/categories/${category?.id || ""}`,
            key: "category",
          },
          {
            text: product.title,
            route: `/products/${product.id}`,
            key: "product",
          },
        ]}
        style={{ width: "500px", maxWidth: "100%" }}
      />

      <section className={styles.productSection}>
        {product.image && (
          <img
            src={`http://localhost:3333/${product.image}`}
            alt={product.title || "Product Image"}
          />
        )}
        <div>
          <h3>{product.title || "No Title"}</h3>
          {hasDiscount && (
            <span className={styles.discountBorder}>
              -{Math.floor(100 - (product.discont_price * 100) / product.price)}
              %
            </span>
          )}
          <div className={styles.productsContent}>
            <span className={styles.primaryPrice}>
              $
              {product.discont_price !== null
                ? product.discont_price
                : product.price}
            </span>
            <span className={styles.secondaryPrice}>
              {product.discont_price !== null ? `$${product.price}` : ""}
            </span>
          </div>
          <div className={styles.countAndButton}>
            <div className={styles.cartPageItemInfoLeftBtnCounter}>
              <button onClick={() => decrementCount(product.id)}>-</button>
              <input
                type="text"
                min="1"
                value={product.count}
                onChange={(e) =>
                  updateQuantity(product.id, Number(e.target.value))
                }
              />
              <button onClick={() => incrementCount(product.id)}>+</button>
            </div>
            <Button
              initialText="Add to cart"
              clickedText="Added"
              onClick={() => push(product)}
              style={{ width: "316px" }}
            />
          </div>
          {product.description && (
            <div className={styles.description}>
              <h4>Description</h4>
              <p>
                {isTextShortened
                  ? appendEllipsis(product.description)
                  : product.description}
              </p>
              {product.description.length > maxShortenedLength && (
                <button onClick={() => setTextShortened(!isTextShortened)}>
                  {isTextShortened ? "Read more" : "Read less"}
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default ProductPage;
