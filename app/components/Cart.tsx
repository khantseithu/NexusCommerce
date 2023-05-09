"use client";

import Image from "next/image";
import { useCartStore } from "@/store";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price / 100);
}

export default function Cart() {
  const cartStore = useCartStore();
  console.log(cartStore.isOpen);
  return (
    <div
      onClick={() => cartStore.toggleCart()}
      className="fixed w-full h-screen left-0 top-0 bg-black/25"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white absolute right-0 top-0 w-1/4 h-screen overflow-y-scroll text-gray-700 p-4"
      >
        <h1>Here is your shopping cart:</h1>
        {cartStore.cart.map((item, index) => (
          <div className="flex py-4 gap-4" key={`${item.id} - ${index}`}>
            <Image
              className="rounded-lg shadow-lg"
              src={item.image}
              width={100}
              height={100}
              alt={item.name}
            />
            <div>
              <h2>{item.name}</h2>
              <h2>Quantity: {item.quantity}</h2>
              <h2>
                Price: {item.unit_amount && formatPrice(item.unit_amount)}
              </h2>
            </div>
          </div>
        ))}
        <button className="py-2 mt-4 bg-teal-700 w-full text-white rounded-lg">
          Checkout
        </button>
      </div>
    </div>
  );
}
