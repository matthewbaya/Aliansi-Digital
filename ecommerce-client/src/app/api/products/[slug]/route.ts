import ProductModel from "@/db/models/ProductModel";
import { NextRequest } from "next/server";

export type GetProductDetailParams = {
  params: {
    slug: string;
  };
};

export async function GET(
  request: NextRequest,
  { params }: GetProductDetailParams
) {
  const product = await ProductModel.getProductBySlug(params.slug);
  return Response.json(product);
}
