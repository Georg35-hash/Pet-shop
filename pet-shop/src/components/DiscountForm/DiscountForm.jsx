import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, TextField } from "@mui/material";
import animals from "../../assets/sales/animals.svg";
import styles from "../DiscountForm/DiscountForm.module.css";
import useShoppingCartStore from "../../zustand/stores/shoppingCart";
import Notifi from "../Notif/Notif";

const textFieldStyles = {
  mt: 2,
  width: "100%",
  color: "white",
  "& input": {
    caretColor: "white",
    color: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": { borderColor: "white" },
    "&:hover fieldset": { borderColor: "white" },
    "&.Mui-focused fieldset": { borderColor: "white" },
  },
  "& .MuiFormLabel-root": { color: "white" },
  "& .MuiFormLabel-root.Mui-focused": { color: "white" },
  "& .MuiInputBase-root": { color: "white" },
  "& .MuiOutlinedInput-input": { color: "white" },
  "& .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
  "& .Mui-disabled": { color: "white", "-webkit-text-fill-color": "white" },
};

export default function DiscountForm() {
  const [isButtonClicked, setCardHovered] = useState(false);
  const [notification, setNotification] = useState({
    isShown: false,
    title: "",
    message: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    useShoppingCartStore.getState().resetDiscount();
  }, []);

  const onSubmit = () => {
    setNotification({
      isShown: true,
      title: "Discount Applied!",
      message: "You received an additional 5% discount on your first order.",
    });

    useShoppingCartStore.getState().applyDiscount();
  };

  return (
    <section className={`${styles.salesSection} hidden`}>
      <h2 className={styles.discountTitle}>5% off on the first order</h2>

      <div className={styles.salesContainer}>
        <div>
          <img src={animals} alt="Animal" className={styles.salesImage} />
        </div>
        <form className={styles.salesForm} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="dense"
            error={!!errors.name}
            helperText={errors.name ? errors.name.message : ""}
            {...register("name", {
              required: "Name is required",
              minLength: { value: 3, message: "At least 3 characters" },
            })}
            sx={textFieldStyles}
          />
          <TextField
            label="Phone number"
            variant="outlined"
            fullWidth
            margin="dense"
            error={!!errors.phone}
            helperText={errors.phone ? errors.phone.message : ""}
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^\+?[1-9]\d{9,14}$/,
                message: "Invalid phone number",
              },
            })}
            sx={textFieldStyles}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="dense"
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ""}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email format",
              },
            })}
            sx={textFieldStyles}
          />
          <div
            className={styles.buttonContainer}
            onMouseEnter={() => setCardHovered(true)}
            onMouseLeave={() => setCardHovered(false)}
          >
            <Button
              type="submit"
              variant="contained"
              className={styles.salesButton}
              sx={{
                background: isButtonClicked ? "gray" : "#0d50ff",
              }}
            >
              Get a discount
            </Button>
          </div>
        </form>
      </div>
      <Notifi notification={notification} setNotification={setNotification} />
    </section>
  );
}
