import { verifyToken } from "@/db/helpers/jwt";
import WishlistModel from "@/db/models/WishlistModel";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const userId = request.headers.get("x-user-id") as string;
  console.log(userId);

  const products = await WishlistModel.getWishlists(userId);
  return Response.json(products);
};

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
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();

    const data = await WishlistModel.deleteWishlist(id);
    return Response.json(
      { message: "Wishlist deleted successfully", data },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
