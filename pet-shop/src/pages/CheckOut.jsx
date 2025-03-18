import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import useShoppingCartStore from "../zustand/stores/shoppingCart";
import { useNavigate } from "react-router-dom";
import styles from "../styles/CheckOut.module.css";
import OrderForm from "../components/OrderForm/OrderForm";
import Notifi from "../components/Notif/Notif";
import { useState } from "react";
import { send } from "../zustand/services/order";
import useUserStore from "../zustand/stores/user";
import Button from "../components/Button/Button";
import SectionTitle from "../components/SectionTitle/SectionTitle";

import NavigationButton from "../components/NavButton/NavButton";

export default function CheckOut() {
  const user = useUserStore((state) => state.user);
  const {
    products,
    remove,
    updateQuantity,
    incrementCount,
    decrementCount,
    clear,
  } = useShoppingCartStore();
  const navigate = useNavigate();
  const [notification, setNotification] = useState({
    isShown: false,
    title: "Congratulations!",
    message:
      "Your order has been successfully placed on the website.\n\nA manager will contact you shortly to confirm your order.",
  });

  const isCartEmpty = Object.keys(products).length === 0;

  return (
    <main>
      <section className={styles.shoppingCart}>
        <div className={styles.titleBox}>
          <SectionTitle content="Shopping Cart" style={{ maxWidth: "440px" }} />
          <span className={styles.titleLine}></span>
          <Notifi
            notification={notification}
            setNotification={setNotification}
            onClose={() => clear()}
          />

          <NavigationButton
            text="Back to the store"
            style={{ maxWidth: 160 }}
          />
        </div>

        <div className={styles.cartsContainer}>
          {isCartEmpty ? (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p>Looks like you have no items in your basket currently.</p>
              <Button
                initialText="Continue Shopping"
                clickedText="Redirecting..."
                onClick={() => navigate("/products")}
                dependencies={{}}
                style={{
                  width: "313px",
                  marginTop: "32px",
                  marginBottom: "80px",
                }}
              />
            </div>
          ) : (
            <>
              <ul className={styles.cartPageItemsBox}>
                {Object.values(products).map((product) => (
                  <li key={product.id} className={styles.cartPageItem}>
                    <div className={styles.cartPageItemImg}>
                      <img
                        src={`http://localhost:3333${product.image}`}
                        alt={product.title}
                      />
                    </div>
                    <div className={styles.cartPageItemInfo}>
                      <div className={styles.cartPageItemInfoLeft}>
                        <h4>{product.title}</h4>
                        <div className={styles.cartPageItemInfoLeftPrice}>
                          <div
                            className={styles.cartPageItemInfoLeftPricePrice}
                          >
                            <span className={styles.discountPrice}>
                              ${product.discont_price * product.count}
                            </span>
                          </div>
                        </div>
                        <div className={styles.cartPageItemInfoLeftBtnCounter}>
                          <button onClick={() => decrementCount(product.id)}>
                            -
                          </button>
                          <input
                            type="number"
                            min="1"
                            value={product.count}
                            onChange={(e) =>
                              updateQuantity(product.id, Number(e.target.value))
                            }
                          />
                          <button onClick={() => incrementCount(product.id)}>
                            +
                          </button>
                        </div>
                      </div>
                      <div className={styles.delButtonCont}>
                        <IconButton
                          className={styles.deleteButton}
                          onClick={() => remove(product.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <OrderForm
                onSubmit={async () => {
                  const result = await send(user, products);
                  if (result) {
                    setNotification({ ...notification, isShown: true });
                  }
                }}
              />
            </>
          )}
        </div>
      </section>
    </main>
  );
}
