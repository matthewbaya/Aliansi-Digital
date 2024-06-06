import { Product } from "@/types";

async function getDataDetail(slug: string): Promise<Product> {
  const res = await fetch("http://localhost:3001/products?slug=" + slug);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function ProductDetail({
  params,
}: {
  params: { slug: string };
}) {
  console.log(params);
  let data = await getDataDetail(params.slug);
  data = data[0];
  console.log(data);

  return (
    <>
      <div className="container">
        <img src={data.images[0]} alt="" />
        <h2>Specification</h2>
        <p>{data.description}</p>
        <a href="" className="btn btn-primary">
          Add to wishlist
        </a>
      </div>
    </>
  );
}
