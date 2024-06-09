import { ObjectId } from "mongodb";
import { getCollection } from "../config";
import { Product } from "@/types";

export type Wishlist = {
  _id?: ObjectId | string;
  Product?: Product;
  userId?: ObjectId | string;
  productId: ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
};
class WishlistModel {
  static collection() {
    return getCollection("Wishlists");
  }

  static async getWishlists(userId: string) {
    return this.collection()
      .aggregate([
        {
          $match: {
            userId: new ObjectId(userId),
          },
        },
        {
          $lookup: {
            from: "Products",
            localField: "productId",
            foreignField: "_id",
            as: "Product",
          },
        },
        {
          $unwind: {
            path: "$Product",
            preserveNullAndEmptyArrays: false,
          },
        },
      ])
      .toArray();
  }

  static async getWishlistById(id: string) {
    const objectId = typeof id === "string" ? new ObjectId(id) : id;
    return this.collection().findOne({ _id: objectId });
  }

  static async create(newWishlist: { userId: string; productId: string }) {
    const data = {
      userId: new ObjectId(newWishlist.userId),
      productId: new ObjectId(newWishlist.productId),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.collection().insertOne(data);
  }

  static async deleteWishlist(id: string) {
    const data = this.collection().deleteOne({ _id: new ObjectId(id) });

    return data;
  }
}

export default WishlistModel;
