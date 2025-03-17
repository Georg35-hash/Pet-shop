import styles from "../ProductCard/ProductCard.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useShoppingCartStore from "../../zustand/stores/shoppingCart";

export default function ProductCard({ product }) {
  const [isCardHovered, setCardHovered] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});

  const navigate = useNavigate();
  const push = useShoppingCartStore((state) => state.push);

  const handleCardClick = () => navigate(`/products/${product.id}`);

  const hasDiscount =
    product.discont_price != null && product.discont_price < product.price;

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
        src={`http://localhost:3333/${product.image}`}
        width="316"
        height="284"
        alt={product.title}
      />

      <div className={styles.productsContent}>
        <p className={styles.productsTitle}>{product.title}</p>
        <span className={styles.primaryPrice}>
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
