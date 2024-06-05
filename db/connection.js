
import { MongoClient } from "mongodb";

const connectionString = "mongodb+srv://test:test@cluster0.vinwyba.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(connectionString);
let conn = null;


try {
    console.log("Trying to establish connection...");
    conn = await client.connect();
    console.log("Connected to MongoDB!");
} catch (e) {
    console.error("Error establishing connection:", e);
}

let db = conn.db("cnr")
export default db;
