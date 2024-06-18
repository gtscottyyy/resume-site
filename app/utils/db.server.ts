import { MongoClient, BSON, Db, ServerApiVersion } from "mongodb";

const connectionString: string = process.env.MONGO_URI!;

const client = new MongoClient(connectionString, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;
let cachedCopy: BSON.Document | null = null;

async function connectToDatabase() {
  if (cachedClient && cachedDb && cachedCopy) {
    return { client: cachedClient, db: cachedDb, copy: cachedCopy };
  }

  await client.connect();
  const db = client.db();

  cachedClient = client;
  cachedDb = db;

  // keeping for debugging
  // console.log(cachedClient);
  // keeping for debugging
  // console.log(cachedDb);

  // make data call here and return copy with client and db
  // Connect the client to the server	(optional starting in v4.7)
  // Send a ping to confirm a successful connection
  const ping = await client.db("resume").command({ ping: 1 });
  console.log(
    "Pinged your deployment. You successfully connected to MongoDB!",
    ping
  );

  const copy = await client.db("resume").collection("copy").findOne();

  cachedCopy = copy;

  // keeping for debugging
  // console.log(cachedCopy);

  return { client, db, copy };
}

const ObjectId = BSON.ObjectId;

export { ObjectId, connectToDatabase };
