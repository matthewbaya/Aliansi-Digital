import { ObjectId } from "mongodb";
import { getCollection } from "../config";

class WishlistModel {
  static collection() {
    return getCollection("Wishlists");
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
}

export default WishlistModel;
