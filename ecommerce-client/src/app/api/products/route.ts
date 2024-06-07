import Product from "@/db/models/ProductModel";

export async function GET(request: Request) {
  try {
    const products = await Product.getAllProducts();
    console.log(products);
    return Response.json(products);
  } catch (error) {
    console.log(error);
  }
}
