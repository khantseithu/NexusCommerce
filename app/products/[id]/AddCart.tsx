"use client";

import { useCartStore } from "@/store";
import { AddCartType } from "@/types/AddCartType";

export default function AddCart({
  id,
  name,
  image,
  unit_amount,
  quantity,
}: AddCartType) {
  const cartStore = useCartStore();

  return (
    <>
      <button
        onClick={() => {
          cartStore.addToCart({ id, name, image, unit_amount, quantity });
        }}
        className="w-full px-4 py-2 mt-4 font-bold text-white bg-gray-800 rounded hover:bg-gray-700 focus:outline-none focus:shadow-outline"
      >
        Add to Cart
      </button>
    </>
  );
}
