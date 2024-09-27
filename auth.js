import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import connectDB from "./db/connection.js"; // Correctly importing connectDB

let userCollection;

async function getUserCollection() {
    if (!userCollection) {
        const db = await connectDB(); // Await the MongoDB connection
        userCollection = db.collection("user"); // Initialize userCollection
    }
    return userCollection;
}

const auth = {
    async registerUser(userData) {
        const userCollection = await getUserCollection();

        // Hash the password
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        try {
            // Insert a new user into the collection
            await userCollection.insertOne({
                _id: new ObjectId(),
                username: userData.username,
                password: hashedPassword,
            });
        } catch (e) {
            throw new Error(e.message);
        }
    },

    async loginUser(userData) {
        const userCollection = await getUserCollection();

        try {
            // Find the user by username
            const user = await userCollection.findOne({ username: userData.username });
            if (!user) {
                throw new Error("User not found");
            }

            // Check if the password is correct
            const isPasswordValid = await bcrypt.compare(userData.password, user.password);
            if (!isPasswordValid) {
                throw new Error("Invalid password");
            }

            // Generate JWT token
            const token = jwt.sign(
                { userId: user._id, username: user.username },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );

            return token;
        } catch (e) {
            throw new Error(e.message);
        }
    }
};

export default auth;
