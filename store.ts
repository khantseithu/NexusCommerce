import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AddCartType } from "./types/AddCartType";

type CartState = {
  isOpen: boolean;
  cart: AddCartType[];
  toggleCart: () => void;
  addToCart: (item: AddCartType) => void;
  removeFromCart: (item: AddCartType) => void;
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
      removeFromCart: (item) =>
        set((state) => {
          // check if item exists in cart and quantity is greater than 1 then decrement
          const itemExists = state.cart.find((i) => i.id === item.id);
          if (itemExists && itemExists.quantity! > 1) {
            const updatedCart = state.cart.map((i) =>
              i.id === item.id
                ? { ...i, quantity: (itemExists.quantity as number) - 1 }
                : i
            );
            return { cart: updatedCart };
          } else {
            // remove item from cart
            const updatedCart = state.cart.filter((i) => i.id !== item.id);
            return { cart: updatedCart };
          }
        }),
    }),
    { name: "cart-store" }
  )
);
