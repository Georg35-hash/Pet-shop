import { useEffect, useRef, useState } from "react";
import useProductStore from "../../zustand/stores/products";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import styles from "../Products/Products.module.css";
import useShoppingCartStore from "../../zustand/stores/shoppingCart";
import { useMediaQuery } from "@mui/material";
import SectionTitle from "../SectionTitle/SectionTitle";
import NavigationButton from "../NavButton/NavButton";
import LoadingErrorHandler from "../LoadingErrorHandler/LoadingErrorHandler"; // Импортируем компонент для обработки загрузки и ошибок

export default function Products() {
  const [isAnimating, setIsAnimating] = useState(false);
  const { products, loading, error, fetchProducts } = useProductStore();
  const [activeIndProducts, setActiveIndProducts] = useState(0);
  const [isCardHovered, setCardHovered] = useState({});
  const [addedToCart, setAddedToCart] = useState({});
  const animationTimeout = useRef(null);
  const push = useShoppingCartStore((state) => state.push);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    return () => clearTimeout(animationTimeout.current);
  }, []);

  const filteredProducts = products.filter(
    (product) => product.discont_price != null
  );

  const isXs = useMediaQuery("(max-width:600px)"); // xs
  const isSm = useMediaQuery("(max-width:900px)"); // sm
  const isMd = useMediaQuery("(max-width:1200px)"); // md

  let visibleProSlide = 4;
  if (isMd) visibleProSlide = 3;
  if (isSm) visibleProSlide = 2;
  if (isXs) visibleProSlide = 1;

  const nextSlide = () => {
    setIsAnimating(true);
    clearTimeout(animationTimeout.current); // Clear before new call
    animationTimeout.current = setTimeout(() => {
      setActiveIndProducts((prev) => (prev + 1) % filteredProducts.length);
      setIsAnimating(false);
    }, 200);
  };

  const prevSlide = () => {
    setIsAnimating(true);
    clearTimeout(animationTimeout.current);
    animationTimeout.current = setTimeout(() => {
      setActiveIndProducts(
        (prev) => (prev - 1 + filteredProducts.length) % filteredProducts.length
      );
      setIsAnimating(false);
    }, 500);
  };

  return (
    <section className={styles.coupleSection}>
      <LoadingErrorHandler loading={loading} error={error} />

      {!loading && !error && (
        <>
          <div className={styles.coupleContainer}>
            <SectionTitle content="Sale" />
            <span className={styles.coupleLine}></span>
            <NavigationButton text="All sales" />
          </div>

          <div
            className={`${styles.coupleSliderWrapper} ${
              isAnimating ? styles.animateSlide : ""
            }`}
          >
            <KeyboardArrowLeft onClick={prevSlide} />

            <ul className={styles.productsRenderList}>
              {filteredProducts
                .slice(activeIndProducts, activeIndProducts + visibleProSlide)
                .concat(
                  filteredProducts.slice(
                    0,
                    Math.max(
                      0,
                      visibleProSlide -
                        (filteredProducts.length - activeIndProducts)
                    )
                  )
                )
                .map((product) => (
                  <li
                    className={styles.productsRenderItem}
                    key={product.id}
                    onMouseEnter={() =>
                      setCardHovered((prev) => ({
                        ...prev,
                        [product.id]: true,
                      }))
                    }
                    onMouseLeave={() =>
                      setCardHovered((prev) => ({
                        ...prev,
                        [product.id]: false,
                      }))
                    }
                  >
                    <span className={styles.discountBorder}>
                      -
                      {Math.floor(
                        100 - (product.discont_price * 100) / product.price
                      )}
                      %
                    </span>

                    <button
                      className={styles.cartButton}
                      onClick={(event) => {
                        event.stopPropagation();
                        push(product);
                        setAddedToCart((prev) => ({
                          ...prev,
                          [product.id]: true,
                        }));
                      }}
                      style={{
                        opacity: isCardHovered[product.id] ? 1 : 0,
                        backgroundColor: addedToCart[product.id]
                          ? "black"
                          : "#0d50ff",
                      }}
                    >
                      {addedToCart[product.id] ? "Added" : "Add to basket"}
                    </button>

                    <img
                      className={styles.productsRenderImage}
                      src={`http://localhost:3333${product.image}`}
                      alt={product.title}
                    />
                    <div className={styles.productsContent}>
                      <p className={styles.productsTitle}>{product.title}</p>
                      <span className={styles.primaryPrice}>
                        ${product.discont_price}
                      </span>
                      <span className={styles.secondaryPrice}>
                        ${product.price}
                      </span>
                    </div>
                  </li>
                ))}
            </ul>

            <KeyboardArrowRight onClick={nextSlide} />
          </div>
        </>
      )}
    </section>
  );
}
