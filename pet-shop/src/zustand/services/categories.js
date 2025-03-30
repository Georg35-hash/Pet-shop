import axios from "axios";

const API_URL = "https://pet-shop-backend-0fzb.onrender.com/categories";

export const get = async () => {
  try {
    const response = await axios.get(`${API_URL}/all`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : "Network error"
    );
  }
};

export const getById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : "Network error"
    );
  }
};
