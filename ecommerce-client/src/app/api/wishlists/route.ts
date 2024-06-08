import { verifyToken } from "@/db/helpers/jwt";
import WishlistModel from "@/db/models/WishlistModel";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body: { productId: string } = await request.json();
    const userId = request.headers.get("x-user-id") as string;
    // console.log(userId);
    const newWishList = {
      userId,
      productId: body.productId,
    };

    await WishlistModel.create(newWishList);

    return NextResponse.json({
      message: "Product added to wishlist",
      productId: body.productId,
      userId: userId,
    });
  } catch (error) {
    console.log(error);
  }
}
