"use client";

import Image from "next/image";
import { useCartStore } from "@/store";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";

export default function Cart() {
  const cartStore = useCartStore();

  const totalPrice = cartStore.cart.reduce((acc, item) => {
    return acc + (item.unit_amount as number) * (item.quantity as number);
  }, 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      onClick={() => cartStore.toggleCart()}
      className="fixed w-full h-screen left-0 top-0 bg-black/25"
    >
      <motion.div
        layout
        onClick={(e) => e.stopPropagation()}
        className="bg-white absolute right-0 top-0 w-full lg:w-2/5 h-screen overflow-y-scroll text-gray-700 p-4"
      >
        <button
          onClick={() => cartStore.toggleCart()}
          className="text-sm font-bold pb-12"
        >
          Back To Home
        </button>
        {cartStore.cart.map((item, index) => (
          <motion.div
            layout
            className="flex py-4 gap-4"
            key={`${item.id} - ${index}`}
          >
            <Image
              className="rounded-lg shadow-lg"
              src={item.image}
              width={100}
              height={100}
              alt={item.name}
            />
            <motion.div layout>
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
            </motion.div>
          </motion.div>
        ))}

        <AnimatePresence>
          {cartStore.cart.length === 0 && (
            <motion.div
              animate={{ scale: 1, rotateZ: 0, opacity: 0.7 }}
              initial={{ scale: 0, rotateZ: -10, opacity: 0 }}
              exit={{ scale: 0, rotateZ: -10, opacity: 0 }}
              className="flex flex-col items-center gap-12 text-2xl font-medium pt-44 opacity-75"
            >
              <h1>Your cart is empty 🥹</h1>
              <Image
                src="/purchase.png"
                alt="basket"
                width={200}
                height={200}
              />
            </motion.div>
          )}
        </AnimatePresence>
        {/* checkout and total */}
        <motion.div layout>
          {cartStore.cart.length > 0 && (
            <>
              <p>Total: {formatPrice(totalPrice)}</p>
              <button className="py-2 mt-4 bg-teal-700 w-full text-white rounded-lg">
                Checkout
              </button>
            </>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price / 100);
}
