import { create } from "zustand";
import {
  get as fetchAllProducts,
  getById as fetchProductById,
} from "../services/products";

const useProductStore = create((set) => ({
  products: [],
  filteredProducts: [],
  loading: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true, error: null });

    try {
      const products = await fetchAllProducts();
      set({ products, filteredProducts: products, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  fetchProductById: async (id) => {
    set({ loading: true, error: null });

    try {
      const product = await fetchProductById(id);
      set({
        product: Array.isArray(product) ? product[0] : product,
        loading: false,
      });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  setFilteredProducts: (filtered) => set({ filteredProducts: filtered }),

  // Фильтрация товаров с наличием скидки
  filteredDiscountedProducts: () => {
    set((state) => {
      const discountedProducts = state.products.filter(
        (product) => product.discont_price != null
      );
      return { filteredProducts: discountedProducts };
    });
  },

  name: "products",
  getStorage: () => localStorage,
}));

export default useProductStore;
