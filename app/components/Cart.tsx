"use client";

import Image from "next/image";
import { useCartStore } from "@/store";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

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
              <div className="flex gap-2">
                <h2>Quantity: {item.quantity}</h2>
                <button
                  onClick={() =>
                    cartStore.removeFromCart({
                      id: item.id,
                      image: item.image,
                      name: item.name,
                      unit_amount: item.unit_amount,
                      quantity: (item.quantity as number) + 1,
                    })
                  }
                >
                  <IoRemoveCircleOutline />
                </button>
                <button
                  onClick={() =>
                    cartStore.addToCart({
                      id: item.id,
                      image: item.image,
                      name: item.name,
                      unit_amount: item.unit_amount,
                      quantity: (item.quantity as number) + 1,
                    })
                  }
                >
                  <IoAddCircleOutline />
                </button>
              </div>
              <h2>
                Price: {item.unit_amount && formatPrice(item.unit_amount)}
              </h2>
            </div>
          </div>
        ))}
        {cartStore.cart.length === 0 && (
          <div className="flex flex-col items-center gap-12 text-2xl font-medium pt-44 opacity-75">
            <h1>Your cart is empty 🥹</h1>
            <Image src="/purchase.png" alt="basket" width={200} height={200} />
          </div>
        )}
        {cartStore.cart.length > 0 && (
          <button className="py-2 mt-4 bg-teal-700 w-full text-white rounded-lg">
            Checkout
          </button>
        )}
      </div>
    </div>
  );
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price / 100);
}
