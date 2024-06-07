import ProductCard from "@/components/ProductCard";
import { Product } from "@/types";

async function getData(): Promise<Product[]> {
  const res = await fetch("http://localhost:3000/api/products", {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function MiceProductPage() {
  const products = await getData();
  console.log(products);

  return (
    <>
      <h1 className="display-2 text-center">Product List</h1>
      <div className="container d-flex flex-wrap gap-5 justify-content-center">
        {products.map((e, id) => {
          return <ProductCard key={id} product={e}></ProductCard>;
        })}
      </div>
    </>
  );
}
