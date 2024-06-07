import { getCollection } from "../config";

export default class Product {
  static collection() {
    return getCollection("Products");
  }
  static async getAllProducts() {
    const products = await this.collection().find().toArray();
    return products;
  }
}
