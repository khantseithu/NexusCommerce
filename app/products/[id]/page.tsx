import { SearchParamTypes } from "@/types/SearchParamTypes";
import Image from "next/image";
import AddCart from "./AddCart";

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

          <AddCart {...searchParams} />
        </div>
      </div>
    </div>
  );
}
