import { SearchParamTypes } from "@/types/SearchParamTypes";
import Image from "next/image";

export default async function Product({ searchParams }: SearchParamTypes) {
  return (
    <div className="md:flex  justify-between gap-16 p-12 text-gray-700">
      <Image
        src={searchParams.image}
        alt={searchParams.name}
        width={350}
        height={350}
      />
      <div className="pt-2">
        <h1 className="font-bold text-xl pb-4">{searchParams.name}</h1>
        <p>{searchParams.description}</p>
        {/* // add price and buy button // price */}

        <div className="flex gap-6 items-center">
          <p className="mt-3 text-black font-bold">
            {searchParams.unit_amount &&
              new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: searchParams.currency,
              }).format(searchParams.unit_amount / 100)}
          </p>

          <button className="w-full px-4 py-2 mt-4 font-bold text-white bg-gray-800 rounded hover:bg-gray-700 focus:outline-none focus:shadow-outline">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
