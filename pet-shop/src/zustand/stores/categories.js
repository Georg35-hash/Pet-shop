import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";
import { persist } from "zustand/middleware";
import { get as fetchAllCategories } from "../services/categories";

const useCategoryStore = create(
  persist(
    devtools(
      immer((set, get) => ({
        categories: [],
        loading: false,
        error: null,

        fetchCategories: async () => {
          set((state) => {
            state.loading = true;
            state.error = null;
          });

          try {
            const categories = await fetchAllCategories();
            set((state) => {
              state.categories = categories;
              state.loading = false;
            });
          } catch (err) {
            set((state) => {
              state.error = err.message;
              state.loading = false;
            });
          }
        },

        fetchCategoryByID: async (id) => {
          let category = get().categories.find(
            (category) => category.id === id
          );

          if (!category) {
            await get().fetchCategories(); // Load categories
            category = get().categories.find((category) => category.id === id);
          }

          return category;
        },
      }))
    ),
    {
      name: "categories",
      getStorage: () => localStorage,
    }
  )
);

export default useCategoryStore;
