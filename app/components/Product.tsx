import { ProductType } from "@/types/ProductType";
import Image from "next/image";

export default function Product({ id, name, unit_amount, image, currency, description, metadata, }: ProductType) {
    return <div className="flex flex-col items-center justify-center w-full max-w-sm mx-auto mb-4 overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
    <img className="object-cover w-full h-56" src={image} alt={name}/>
    
    <div className="w-full p-4">
      <p className="mb-2 text-xl font-semibold text-gray-800 dark:text-white">
        {name}
      </p>
      <p className="text-gray-800 dark:text-white">{description}</p>
      {unit_amount && <p className="mt-3 text-gray-800 dark:text-white">
        {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency,
        }).format(unit_amount / 100)}
      </p>}
      <button className="w-full px-4 py-2 mt-4 font-bold text-white bg-gray-800 rounded hover:bg-gray-700 focus:outline-none focus:shadow-outline">
        Buy
      </button>
    </div>
  </div>;
}