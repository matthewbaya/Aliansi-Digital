import { Product } from "@/types";

async function getDataDetail(slug: string): Promise<Product> {
  const res = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + "/api/products/" + slug
  );

  if (!res.ok) {
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
  // data = data[0];

  return (
    <>
      <div className="container">
        <img src={data.images[0]} alt="" />
        <img src={data.images[1]} alt="" />
        <img src={data.images[2]} alt="" />
        <h2>Specification</h2>
        {/* <p>{data.description}</p> */}
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Description</th>
              <th scope="col">Last</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Model</th>
              <td>Mark</td>
            </tr>
            <tr>
              <th scope="row">Color</th>
              <td>Jacob</td>
            </tr>
            <tr>
              <th scope="row">Shape</th>
              <td colSpan={2}>Larry the Bird</td>
            </tr>
          </tbody>
        </table>

        <a href="" className="btn btn-primary">
          Add to wishlist
        </a>
      </div>
    </>
  );
}
