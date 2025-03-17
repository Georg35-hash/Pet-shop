import styles from "../styles/ProductPage.module.css";

import { useParams } from "react-router-dom";

import { useState, useEffect } from "react";
import Button from "../components/Button/Button";
import NavigationRow from "../components/NavRow/NavRow";
import useShoppingCartStore from "../zustand/stores/shoppingCart";
import useProductsStore from "../zustand/stores/products";
import useCategoryStore from "../zustand/stores/categories";
import { CircularProgress } from "@mui/material";

function Product() {
  const productById = useProductsStore((state) => state.byId);

  const categoryById = useCategoryStore((state) => state.byId);

  const push = useShoppingCartStore((state) => state.push);

  const [isLoading, setLoading] = useState(true);
  const [isTextShortened, setTextShortened] = useState(true);

  const maxShortenedLength = 700;

  const { productId } = useParams();

  useEffect(() => {
    (async () => {
      await new Promise((r) => setTimeout(r, 2000));
      setLoading(false);
    })();
  }, []);

  if (isLoading) return <CircularProgress />;

  const product = productById(productId);
  const category = categoryById(product.categoryId);

  function appendEllipsis(text) {
    if (text.length < maxShortenedLength) return text;
    return text.slice(0, maxShortenedLength).trim() + "...";
  }

  return (
    <>
      <NavigationRow
        buttons={[
          { text: "Main Page", route: "/" },
          { text: "Categories", route: "/categories" },
          { text: category.title, route: `/categories/${category.id}` },
          { text: product.title, route: `/products/${product.id}` },
        ]}
      />
      <section className={styles.product}>
        <img src={`http://localhost:3333/${product.image}`} />
        <div>
          <h3>{product.title}</h3>

          <div className={styles.countAndButton}>
            <Button
              initialText="Add to cart"
              clickedText="Added"
              onClick={(dependencies) => push(dependencies.product)}
              dependencies={{ product: product }}
              style={{
                width: "316px",
              }}
            />
          </div>
          <div className={styles.description}>
            <h4>Description</h4>
            <p>
              {isTextShortened
                ? appendEllipsis(product.description)
                : product.description}
            </p>
            <a
              onClick={() => setTextShortened(!isTextShortened)}
              style={{
                display: `${
                  product.description.length <= maxShortenedLength
                    ? "none"
                    : "block"
                }`,
              }}
            >
              {isTextShortened ? "Read more" : "Read less"}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default Product;
