import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";
import { persist } from "zustand/middleware";

const useShoppingCartStore = create(
  devtools(
    persist(
      immer((set, get) => ({
        products: {},
        userReceivedDiscount: false,

        push: (product, count = 1) => {
          set((state) => {
            if (!state.products[product.id]) {
              state.products[product.id] = { ...product, count };
            } else {
              state.products[product.id].count += count;
            }
          });
        },

        remove: (productId) => {
          set((state) => {
            delete state.products[productId];
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
            if (state.products[productId]) {
              state.products[productId].count -= 1;
              if (state.products[productId].count < 1) {
                delete state.products[productId];
              }
            }
          });
        },

        updateQuantity: (productId, newCount) => {
          set((state) => {
            if (newCount < 1) {
              delete state.products[productId];
            } else if (state.products[productId]) {
              state.products[productId].count = newCount;
            }
          });
        },

        totalPrice: () => {
          const baseTotal = Object.values(get().products).reduce(
            (total, product) => {
              const price = product.discont_price ?? product.price;
              return total + price * product.count;
            },
            0
          );

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

        resetDiscount: () => {
          set({ userReceivedDiscount: false });
        },

        resetCart: () => {
          set({ products: {}, userReceivedDiscount: false });
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
