"use client";

import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import Image from "next/image";

function Navbar({ user }: Session) {
  return (
    <nav className="flex justify-between items-center py-6 mx-4">
      <h1 className="uppercase font-bold text-black text-xl md:text-3xl">Nexus</h1>
      <ul className="flex justify-between items-center gap-3 md:gap-12 ">
        <li>products</li>
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
                width={50}
                height={50}
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
    </nav>
  );
}
export default Navbar;
