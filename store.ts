import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AddCartType } from "./types/AddCartType";

type CartState = {
  isOpen: boolean;
  cart: AddCartType[];
  toggleCart: () => void;
  addToCart: (item: AddCartType) => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      isOpen: false,
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      addToCart: (item) =>
        set((state) => {
          const itemExists = state.cart.find((i) => i.id === item.id);

          if (itemExists) {
            return {
              cart: state.cart.map((i) =>
                i.id === item.id
                  ? { ...item, quantity: (itemExists.quantity as number) + 1 }
                  : i
              ),
            };
          }

          return { cart: [...state.cart, { ...item, quantity: 1 }] };
        }),
    }),
    { name: "cart-store" }
  )
);
