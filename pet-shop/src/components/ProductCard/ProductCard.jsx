import styles from "../ProductCard/ProductCard.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useShoppingCartStore from "../../zustand/stores/shoppingCart";
import { useTheme } from "@mui/material/styles";

export default function ProductCard({ product }) {
  const [isCardHovered, setCardHovered] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});
  const [timerId, setTimerId] = useState(null);

  const navigate = useNavigate();
  const push = useShoppingCartStore((state) => state.push);

  const handleCardClick = () => navigate(`/products/${product.id}`);

  const hasDiscount =
    product.discont_price != null && product.discont_price < product.price;
  const theme = useTheme();
  useEffect(() => {
    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [timerId]);

  return (
    <div
      className={styles.productCard}
      onMouseEnter={() => setCardHovered(true)}
      onMouseLeave={() => setCardHovered(false)}
      onClick={handleCardClick}
    >
      {hasDiscount && (
        <span className={styles.discountBorder}>
          -{Math.floor(100 - (product.discont_price * 100) / product.price)}%
        </span>
      )}
      <button
        className={styles.cartButton}
        onClick={(event) => {
          event.stopPropagation();
          push(product);
          setAddedToCart((prev) => ({ ...prev, [product.id]: true }));
          const id = setTimeout(() => {
            setAddedToCart((prev) => ({ ...prev, [product.id]: false }));
          }, 3000);

          setTimerId(id);
        }}
        style={{
          opacity: isCardHovered ? 1 : 0,
          backgroundColor:
            addedToCart[product.id] === true ? "black" : "#0d50ff",
        }}
      >
        {addedToCart[product.id] ? "Added" : "Add to basket"}
      </button>
      <img
        className={styles.cardImage}
        src={`https://pet-shop-backend-0fzb.onrender.com${product.image}`}
        width="316"
        height="284"
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
          $
          {product.discont_price != null
            ? product.discont_price
            : product.price}
        </span>
        <span className={styles.secondaryPrice}>
          {product.discont_price != null ? `$${product.price}` : ""}
        </span>
      </div>
    </div>
  );
}
