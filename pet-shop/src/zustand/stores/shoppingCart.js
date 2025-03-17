import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";
import { persist } from "zustand/middleware";

const useShoppingCartStore = create(
  devtools(
    persist(
      immer((set, get) => ({
        products: {},
        userReceivedDiscount: false, // Новое состояние для 5% скидки

        push: (product, count = 1) => {
          set((state) => {
            const newProducts = { ...state.products };
            if (!newProducts[product.id]) {
              newProducts[product.id] = { ...product, count };
            } else {
              newProducts[product.id].count += count;
            }
            return { products: newProducts };
          });
        },

        remove: (productId) => {
          set((state) => {
            const newProducts = { ...state.products };
            delete newProducts[productId];
            return { products: newProducts };
          });
        },

        incrementCount: (productId) => {
          set((state) => {
            if (state.products[productId]) {
              state.products[productId].count += 1;
            }
          });
        },

        decrementCount: (productId) => {
          set((state) => {
            if (
              state.products[productId] &&
              state.products[productId].count > 1
            ) {
              state.products[productId].count -= 1;
            }
          });
        },

        totalPrice: () => {
          const baseTotal = Object.values(get().products).reduce(
            (total, product) => {
              const price = product.discont_price || product.price;
              return total + price * product.count;
            },
            0
          );

          // Если скидка 5% применена — пересчитываем сумму
          return get().userReceivedDiscount ? baseTotal * 0.95 : baseTotal;
        },

        totalCount: () => {
          return Object.values(get().products).reduce(
            (total, product) => total + product.count,
            0
          );
        },

        clear: () => set({ products: {} }),

        applyDiscount: () => {
          set({ userReceivedDiscount: true });
        },
      })),
      {
        name: "shopping-cart",
        getStorage: () => localStorage,
      }
    )
  )
);

export default useShoppingCartStore;
