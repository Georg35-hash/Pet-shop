import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import Button from "../components/Button/Button";
import NavigationRow from "../components/NavRow/NavRow";
import useShoppingCartStore from "../zustand/stores/shoppingCart";
import useProductsStore from "../zustand/stores/products";
import useCategoryStore from "../zustand/stores/categories";
import styles from "../styles/ProductPage.module.css";

export default function ProductPage() {
  const { productId } = useParams();
  const { loading, error, products, fetchProductById } = useProductsStore();
  const categoryById = useCategoryStore((state) => state.fetchCategoryByID);
  const push = useShoppingCartStore((state) => state.push);
  const [quantity, setQuantity] = useState(1);
  const [isTextShortened, setTextShortened] = useState(true);
  const maxShortenedLength = 700;

  useEffect(() => {
    fetchProductById(productId);
  }, [fetchProductById, productId]);

  if (loading) return <CircularProgress />;
  if (error) return <p>Error: {error}</p>;

  const product = products.find((p) => p.id === Number(productId));
  if (!product) return <p>Product not found</p>;

  const category = categoryById(product.categoryId);

  const hasDiscount =
    product.discont_price && product.discont_price < product.price;
  const displayPrice = product.discont_price || product.price;
  const appendEllipsis = (text) =>
    text?.length > maxShortenedLength
      ? text.slice(0, maxShortenedLength).trim() + "..."
      : text;

  return (
    <>
      <NavigationRow
        buttons={[
          { text: "Main Page", route: "/" },
          { text: "Categories", route: "/categories" },
          {
            text: category?.title || "Loading...",
            route: `/categories/${category.id}`,
          },
          { text: product?.title, route: `/products/${product.id}` },
        ]}
        style={{ width: "500px", maxWidth: "100%" }}
      />

      <section className={styles.productSection}>
        {product.image && (
          <img
            src={`http://localhost:3333/${product.image}`}
            alt={product.title}
          />
        )}
        <div>
          <h3>{product.title}</h3>
          {hasDiscount && (
            <span className={styles.discountBorder}>
              -{Math.floor(100 - (displayPrice * 100) / product.price)}%
            </span>
          )}
          <div className={styles.productsContent}>
            <span className={styles.primaryPrice}>${displayPrice}</span>
            {hasDiscount && (
              <span className={styles.secondaryPrice}>${product.price}</span>
            )}
          </div>
          <div className={styles.countAndButton}>
            <div className={styles.cartPageItemInfoLeftBtnCounter}>
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                -
              </button>
              <input
                type="text"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, Number(e.target.value) || 1))
                }
              />
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
            <Button
              initialText="Add to cart"
              clickedText="Added"
              onClick={() => push(product, quantity)}
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
