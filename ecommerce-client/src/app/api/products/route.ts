import Product from "@/db/models/ProductModel";
import { cookies } from "next/headers";

export async function GET() {
  const products = await Product.getAllProducts();

  return Response.json(products);
}
