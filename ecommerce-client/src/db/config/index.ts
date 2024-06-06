const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.MONGO_URI as string;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const db = client.db("my-ecommerce-app");

export const getCollection = (collectionName: string) => {
  return db.collection(collectionName);
};
