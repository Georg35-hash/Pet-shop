import styles from "./OrderForm.module.css";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useUserStore from "../../zustand/stores/user";
import useShoppingCartStore from "../../zustand/stores/shoppingCart";
import { useTheme } from "@mui/material/styles";

export default function OrderForm({ onSubmit }) {
  const user = useUserStore((state) => state.user);
  const setUsername = useUserStore((state) => state.setUsername);
  const setPhoneNumber = useUserStore((state) => state.setPhoneNumber);
  const setEmail = useUserStore((state) => state.setEmail);

  const totalCount = useShoppingCartStore((state) => state.totalCount);
  const totalPrice = useShoppingCartStore((state) => state.totalPrice);
  const theme = useTheme();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: user.username || "",
      email: user.email || "",
      phoneNumber: user.phoneNumber || "",
    },
  });

  useEffect(() => {
    setValue("username", user.username || "");
    setValue("email", user.email || "");
    setValue("phoneNumber", user.phoneNumber || "");
  }, [user, setValue]);

  const onChange = (event) => {
    const { name, value } = event.target;
    setValue(name, value, { shouldValidate: true });

    switch (name) {
      case "username":
        setUsername(value);
        break;
      case "phoneNumber":
        setPhoneNumber(value);
        break;
      case "email":
        setEmail(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.orderForm}>
      <h3 style={{ color: theme.palette.text.secondary }}>Order details</h3>
      <p>{totalCount()} items</p>
      <div className={styles.price}>
        <span>Total</span>
        <span className={styles.price}>${totalPrice().toFixed(2)}</span>{" "}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("username", {
            required: "Name is required",
            minLength: {
              value: 7,
              message: "Name must be at least 7 characters long",
            },
          })}
          type="text"
          placeholder="Name"
          onChange={onChange}
        />
        {errors.username && (
          <p className={styles.error}>{errors.username.message}</p>
        )}

        <input
          {...register("phoneNumber", {
            required: "Phone number is required",
            minLength: {
              value: 7,
              message: "Phone number must be at least 7 characters long",
            },
            pattern: {
              value: /^\+?[1-9]\d{9,14}$/,
              message: "Invalid phone number",
            },
          })}
          type="text"
          placeholder="Phone number"
          onChange={onChange}
        />
        {errors.phoneNumber && (
          <p className={styles.error}>{errors.phoneNumber.message}</p>
        )}

        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Invalid email address",
            },
          })}
          type="text"
          placeholder="Email"
          onChange={onChange}
        />
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}
        {useShoppingCartStore.getState().userReceivedDiscount && (
          <div className={styles.discountAppliedBox}>
            <p className={styles.discountAppliedMessage}>
              ✅ Your 5% discount has been applied!
            </p>
          </div>
        )}
        <input type="submit" value="Order" />
      </form>
    </div>
  );
}
