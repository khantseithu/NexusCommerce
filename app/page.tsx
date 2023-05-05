import getProducts from "@/utils/getProducts";
import Stripe from "stripe";
import Product from "./components/Product";

export default async function Home() {
  
  const products = await getProducts()


  return <main className=" md:flex gap-2 flex-wrap ">
    {products.map((product) => 
      <Product key={product.id} {...product}/>
    )}
  </main>;
}
