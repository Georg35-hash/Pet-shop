import { create } from "zustand";
import { get as fetchAllProducts } from "../services/products";

const useProductStore = create((set) => ({
  products: [],
  loading: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true, error: null });

    try {
      const products = await fetchAllProducts();
      set({ products, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  resetProducts: () => set({ products: [] }),
}));

export default useProductStore;
