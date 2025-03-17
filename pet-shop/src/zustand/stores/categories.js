import { create } from "zustand";
import { get as fetchAllCategories } from "../services/categories";

const useCategoryStore = create((set) => ({
  categories: [],
  loading: false,
  error: null,

  fetchCategories: async () => {
    set({ loading: true, error: null });

    try {
      const categories = await fetchAllCategories();
      set({ categories, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  // For update categories
  resetCategories: () => set({ categories: [] }),
}));

export default useCategoryStore;
