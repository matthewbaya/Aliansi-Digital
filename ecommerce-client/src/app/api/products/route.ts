import Product from "@/db/models/ProductModel";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  try {
    // const products = await Product.getAllProducts();
    console.log(cookies().get("Authorization"));

    // console.log(products);
    // return Response.json(products);
  } catch (error) {
    console.log(error);
  }
}
