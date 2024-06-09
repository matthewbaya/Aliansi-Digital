import { getCollection } from "../config";
import { ObjectId } from "mongodb";

export type Product = {
  _id: ObjectId;
  name: string;
  slug: string;
  description?: object;
  excerpt?: string;
  price?: number;
  tags?: string[];
  thumbnail?: string;
  images?: string[];
  createdAt?: Date;
  updatedAt?: Date;
};
export default class ProductModel {
  static collection() {
    return getCollection("Products");
  }
  static async getAllProducts() {
    const products = await this.collection().find().toArray();
    return products;
  }
  static async getProductById(id: string | ObjectId) {
    const objectId = typeof id === "string" ? new ObjectId(id) : id;

    const data = this.collection().findOne({ _id: objectId });
    return data;
  }

  static async getProductBySlug(slug: string) {
    return this.collection().findOne({ slug: slug });
  }
}
