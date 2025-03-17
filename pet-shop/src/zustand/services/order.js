import axios from "axios";

const API_URL = "http://localhost:3333/order/send";

const sendRequest = async (user, products = []) => {
  const response = await axios.post(API_URL, {
    name: user.username,
    phone: user.phoneNumber,
    email: user.email,
    products: Object.values(products),
  });

  return response.status >= 200 && response.status < 300;
};

export const send = (user, products) => sendRequest(user, products);

export const sendWithDiscount = (user) => sendRequest(user, []);
