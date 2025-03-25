import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Skeleton } from "@mui/material";
import Button from "../../components/Button/Button";
import NavigationRow from "../../components/NavRow/NavRow";
import useShoppingCartStore from "../../zustand/stores/shoppingCart";
import useProductsStore from "../../zustand/stores/products";
import useCategoryStore from "../../zustand/stores/categories";
import styles from "../ProductPage/ProductPage.module.css";

const maxShortenedLength = 700;

export default function ProductPage() {
  const { productId } = useParams();
  const { products, fetchProductById } = useProductsStore();
  const categoryById = useCategoryStore((state) => state.fetchCategoryByID);
  const push = useShoppingCartStore((state) => state.push);

  const [quantity, setQuantity] = useState(1);
  const [isTextShortened, setTextShortened] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProductById(productId);
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  }, [fetchProductById, productId]);

  const product = products.find((p) => p.id === Number(productId));

  if (loading) {
    return (
      <section
        style={{
          marginTop: 40,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Skeleton
          variant="rectangular"
          width={300}
          height={300}
          style={{ marginBottom: 20 }}
        />

        <Skeleton
          variant="text"
          width="40%"
          height={30}
          style={{ marginBottom: 10 }}
        />
        <Skeleton
          variant="text"
          width="50%"
          height={30}
          style={{ marginBottom: 10 }}
        />
        <Skeleton variant="rectangular" width={316} height={50} />
      </section>
    );
  }

  if (!product) {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <p>Product not found</p>
      </div>
    );
  }

  const category = categoryById(product.categoryId);
  const hasDiscount =
    product.discont_price && product.discont_price < product.price;
  const displayPrice = product.discont_price || product.price;

  const formatDescription = (text) => {
    return text?.length > maxShortenedLength
      ? `${text.slice(0, maxShortenedLength).trim()}...`
      : text;
  };

  const handleQuantityChange = (amount) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + amount));
  };

  const toggleTextShortened = () => setTextShortened((prev) => !prev);

  return (
    <main>
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
        style={{ width: "700px", maxWidth: "100%" }}
      />

      <section className={styles.productSection}>
        {product.image && (
          <img
            src={`http://localhost:3333/${product.image}`}
            alt={product.title}
          />
        )}
        <div className={styles.discountPriceCont}>
          <h3>{product.title}</h3>
          <div className={styles.productsContent}>
            <span className={styles.primaryPrice}>${displayPrice}</span>
            {hasDiscount && (
              <>
                <span className={styles.secondaryPrice}>${product.price}</span>
                <span className={styles.discountBorder}>
                  -{Math.floor(100 - (displayPrice * 100) / product.price)}%
                </span>
              </>
            )}
          </div>

          <div className={styles.countAndButton}>
            <div className={styles.cartPageItemInfoLeftBtnCounter}>
              <button onClick={() => handleQuantityChange(-1)}>-</button>
              <input
                type="text"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, Number(e.target.value)))
                }
              />
              <button onClick={() => handleQuantityChange(1)}>+</button>
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
                  ? formatDescription(product.description)
                  : product.description}
              </p>
              {product.description.length > maxShortenedLength && (
                <button
                  onClick={toggleTextShortened}
                  style={{
                    background: "transparent",
                    border: "none",
                    fontFamily: "inherit",

                    textDecoration: "none",
                    cursor: "pointer",
                    padding: 0,
                    fontSize: "inherit",
                  }}
                >
                  {isTextShortened ? "Read more" : "Read less"}
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
