import ProductCard from "@/components/ProductCard";
import SearchInput from "@/components/SearchInput";
import { Product } from "@/types";

async function getData(): Promise<Product[]> {
  const res = await fetch("http://localhost:3001/products");
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function ProductPage() {
  const data = await getData();

  return (
    <>
      <h1 className="display-2 text-center">Product PAGE</h1>
      <div className="container">
        <SearchInput></SearchInput>
        <div className="row gap-5">
          {data.map((product, id) => {
            return <ProductCard key={id} product={product}></ProductCard>;
          })}
        </div>
      </div>
    </>
  );
}
