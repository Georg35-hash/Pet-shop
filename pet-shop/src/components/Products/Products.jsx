import { useEffect, useRef, useState } from "react";
import useProductStore from "../../zustand/stores/products";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import styles from "../Products/Products.module.css";
import useShoppingCartStore from "../../zustand/stores/shoppingCart";
import { useMediaQuery } from "@mui/material";
import SectionTitle from "../SectionTitle/SectionTitle";
import NavigationButton from "../NavButton/NavButton";
import LoadingErrorHandler from "../LoadingErrorHandler/LoadingErrorHandler";
import { useTheme } from "@mui/material/styles";
import { NavLink } from "react-router-dom";
export default function Products() {
  const [isAnimating, setIsAnimating] = useState(false);
  const { products, loading, error } = useProductStore();
  const [activeIndProducts, setActiveIndProducts] = useState(0);
  const [isCardHovered, setCardHovered] = useState({});
  const [addedToCart, setAddedToCart] = useState({});
  const animationTimeout = useRef(null);
  const push = useShoppingCartStore((state) => state.push);

  const theme = useTheme();

  useEffect(() => {
    return () => clearTimeout(animationTimeout);
  }, []);

  const filteredProducts = products.filter(
    (product) => product.discont_price != null
  );

  const xs = useMediaQuery("(max-width:600px)");
  const sm = useMediaQuery("(min-width:600px) and (max-width:900px)");
  const md = useMediaQuery("(max-width:1400px)");

  let visibleProSlide = xs ? 1 : sm ? 2 : md ? 3 : 4;

  const nextSlide = () => {
    setIsAnimating(true);
    setActiveIndProducts((prev) => (prev + 1) % filteredProducts.length);
    setIsAnimating(false);
  };

  const prevSlide = () => {
    setIsAnimating(true);
    setActiveIndProducts(
      (prev) => (prev - 1 + filteredProducts.length) % filteredProducts.length
    );
    setIsAnimating(false);
  };

  return (
    <section className={styles.coupleSection}>
      <LoadingErrorHandler loading={loading} error={error} />

      {!loading && !error && (
        <>
          <div className={styles.coupleContainer}>
            <SectionTitle content="Sale" />
            <span className={styles.coupleLine}></span>
            <NavigationButton text="All sales" route="/allsales" />
          </div>

          <div
            className={`${styles.coupleSliderWrapper} ${
              isAnimating ? styles.animateSlide : ""
            }`}
          >
            <KeyboardArrowLeft sx={{ cursor: "pointer" }} onClick={prevSlide} />

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
                  <NavLink to={`/products/${product.id}`} key={product.id}>
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

                          // Устанавливаем таймер для сброса состояния через 3 секунды
                          setTimeout(() => {
                            setAddedToCart((prev) => ({
                              ...prev,
                              [product.id]: false,
                            }));
                          }, 3000); // 3000 мс = 3 секунды
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
                        src={`https://pet-shop-backend-0fzb.onrender.com${product.image}`}
                        alt={product.title}
                      />
                      <div className={styles.productsContent}>
                        <p
                          className={styles.productsTitle}
                          style={{ color: theme.palette.text.primary }}
                        >
                          {product.title}
                        </p>

                        <span
                          className={styles.primaryPrice}
                          style={{ color: theme.palette.text.primary }}
                        >
                          ${product.discont_price}
                        </span>
                        <span className={styles.secondaryPrice}>
                          ${product.price}
                        </span>
                      </div>
                    </li>
                  </NavLink>
                ))}
            </ul>

            <KeyboardArrowRight
              sx={{ cursor: "pointer" }}
              onClick={nextSlide}
            />
          </div>
        </>
      )}
    </section>
  );
}
