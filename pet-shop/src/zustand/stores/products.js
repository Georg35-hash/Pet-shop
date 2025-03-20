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
        categoriesProducts: [],
        loading: false,
        error: null,

        fetchProducts: async () => {
          set((state) => {
            state.loading = true;
            state.error = null;
          });

          try {
            const products = await fetchAllProducts();
            set((state) => {
              state.products = products;
              state.filteredProducts = products;
              state.loading = false;
            });
          } catch (err) {
            set((state) => {
              state.error = err.message;
              state.loading = false;
            });
          }
        },

        fetchProductById: async (id) => {
          set((state) => {
            state.loading = true;
            state.error = null;
          });

          try {
            const product = await fetchProductById(id);
            set((state) => {
              state.product = Array.isArray(product) ? product[0] : product;
              state.loading = false;
            });
          } catch (err) {
            set((state) => {
              state.error = err.message;
              state.loading = false;
            });
          }
        },

        discounted: () => {
          return get().products.filter(
            (product) => product.discont_price != null
          );
        },

        setFilteredProducts: (filtered) => {
          set((state) => {
            state.filteredProducts = filtered;
          });
        },
        byCategory: (categoryId) => {
          let byCategory = [];

          for (let product of get().products) {
            if (product.categoryId == categoryId) {
              byCategory.push(product);
            }
          }

          return byCategory;
        },
      })),
      {
        name: "products", // Ключ для localStorage
        getStorage: () => localStorage,
      }
    )
  )
);

export default useProductStore;
