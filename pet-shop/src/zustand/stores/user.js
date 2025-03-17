import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";
import { persist } from "zustand/middleware";

const useUserStore = create(
  devtools(
    persist(
      immer((set) => ({
        user: {
          username: null,
          email: null,
          phoneNumber: null,
        },

        setUsername: (username) => {
          set((state) => {
            state.user.username = username;
          });
        },

        setEmail: (email) => {
          set((state) => {
            state.user.email = email;
          });
        },

        setPhoneNumber: (phoneNumber) => {
          set((state) => {
            state.user.phoneNumber = phoneNumber;
          });
        },
      })),
      {
        name: "user",
        getStorage: () => localStorage,
      }
    )
  )
);

export default useUserStore;
