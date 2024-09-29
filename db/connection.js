import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.MONGO_URI;
const client = new MongoClient(url);

let db;

async function connectDB() {
    if (!db) {
        try {
            await client.connect();
            db = client.db(process.env.DB_NAME);
            console.log("Connected to MongoDB");
        } catch (error) {
            console.error("Failed to connect to MongoDB", error);
            throw error;
        }
    }
    return db;
}

export default connectDB;
