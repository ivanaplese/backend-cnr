import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.MONGO_URI; // Use the correct environment variable name
const client = new MongoClient(url); // No need for useNewUrlParser or useUnifiedTopology

let db;

async function connectDB() {
    if (!db) {
        try {
            await client.connect();
            db = client.db(process.env.DB_NAME); // Ensure DB_NAME is set correctly in your .env file
            console.log("Connected to MongoDB");
        } catch (error) {
            console.error("Failed to connect to MongoDB", error);
            throw error;
        }
    }
    return db;
}

export default connectDB;
