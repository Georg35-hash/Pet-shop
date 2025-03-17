import axios from "axios";

const API_URL = "http://localhost:3333/categories";

export const get = async () => (await axios.get(`${API_URL}/all`)).data;

export const getById = async (id) => (await axios.get(`${API_URL}/${id}`)).data;
