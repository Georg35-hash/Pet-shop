import { create } from "zustand";
import {
  get as fetchAllCategories,
  getById as fetchCategoryById,
} from "../services/categories";

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
      // Log and save error
      console.error("Failed to fetch categories:", err);
      set({ error: err.message, loading: false });
    }
  },

  fetchCategoryById: async (id) => {
    set({ loading: true, error: null });

    try {
      const category = await fetchCategoryById(id);
      set((state) => ({
        categories: [...state.categories, category],
        loading: false,
      }));
      return category;
    } catch (err) {
      console.error("Failed to fetch category by ID:", err);
      set({ error: err.message, loading: false });
      return null;
    }
  },

  name: "categories",
  getStorage: () => localStorage,
}));

export default useCategoryStore;
