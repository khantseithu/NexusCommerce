"use client";

import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Cart from "./Cart";
import { useCartStore } from "@/store";
import { AiFillShopping } from "react-icons/ai";

function Navbar({ user }: Session) {
  const cartStore = useCartStore();
  return (
    <nav className="flex justify-between items-center py-6 mx-4">
      <Link href={"/"}>
        <h1 className="uppercase font-bold text-black text-xl md:text-3xl">
          Nexus
        </h1>
      </Link>
      <ul className="flex justify-between items-center gap-3 md:gap-12 ">
        <li className="text-3xl relative cursor-pointer flex items-center">
          <AiFillShopping />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex justify-center items-center text-xs">
            {cartStore.cart.length}
          </span>
        </li>
        {!user && (
          <li>
            <button onClick={() => signIn()}>Sign in</button>
          </li>
        )}{" "}
        {user && (
          <>
            <li>
              <Image
                src={user?.image as string}
                alt="user avatar"
                width={36}
                height={36}
                className="rounded-full ring-1"
              />
            </li>
            <button
              onClick={() => signIn("credentials", { callbackUrl: "/" })}
              className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 p-4 text-white rounded-md font-bold"
            >
              Sign out
            </button>
          </>
        )}
      </ul>
      {cartStore.isOpen && <Cart />}
    </nav>
  );
}
export default Navbar;
