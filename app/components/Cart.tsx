"use client";

import Image from "next/image";
import { useCartStore } from "@/store";

export default function Cart() {
  const cartStore = useCartStore();
  console.log(cartStore.isOpen);
  return <h1>cart</h1>;
}
