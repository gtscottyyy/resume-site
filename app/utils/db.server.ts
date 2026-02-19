import { MongoClient, Db, ServerApiVersion, ObjectId, Document } from "mongodb";

const connectionString = process.env.MONGO_URI ?? "";

const client = new MongoClient(connectionString, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;
let cachedCopy: Document | null = null;

async function connectToDatabase() {
  if (cachedClient && cachedDb && cachedCopy) {
    return { client: cachedClient, db: cachedDb, copy: cachedCopy };
  }

  await client.connect();
  const db = client.db();

  cachedClient = client;
  cachedDb = db;

  await client.db("resume").command({ ping: 1 });

  const copy = await client.db("resume").collection("copy").findOne();

  cachedCopy = copy;

  return { client, db, copy };
}

export { ObjectId, connectToDatabase };
