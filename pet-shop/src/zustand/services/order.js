import axios from "axios";

const API_URL = "https://pet-shop-backend-0fzb.onrender.com/order/send";

const sendRequest = async (user, products = []) => {
  try {
    const response = await axios.post(API_URL, {
      name: user.username,
      phone: user.phoneNumber,
      email: user.email,
      products: Object.values(products),
    });

    return response.status >= 200 && response.status < 300;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : "Network error"
    );
  }
};

export const send = (user, products) => sendRequest(user, products);
