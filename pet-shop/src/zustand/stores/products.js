import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools, persist } from "zustand/middleware";
import {
  get as fetchAllProducts,
  getById as fetchProductById,
} from "../services/products";

const useProductStore = create(
  devtools(
    persist(
      immer((set, get) => ({
        products: [],
        filteredProducts: [],
        loading: false,
        error: null,

        fetchProducts: async () => {
          set({ loading: true, error: null });
          try {
            const products = await fetchAllProducts();
            set({
              products,
              filteredProducts: products,
              filteredCategoryProducts: [],
              loading: false,
            });
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

        discounted: () =>
          get().products.filter((product) => product.discont_price != null),

        setFilteredProducts: (filtered) => {
          set({ filteredProducts: filtered });
        },

        byCategory: (categoryId) =>
          get().products.filter((product) => product.categoryId == categoryId),
      })),
      {
        name: "products",
        getStorage: () => localStorage,
      }
    )
  )
);

export default useProductStore;
