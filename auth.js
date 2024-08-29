import mongo from "mongodb";
import db from "./db/connection.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

// const userCollection = db.collection("user");


const auth = {
    async registerUser(userData) {
        // Hashiranje lozinke
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        try {
            // Ubacivanje novog korisnika
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
        try {
            // Pronalaženje korisnika prema username-u
            const user = await userCollection.findOne({ username: userData.username });
            if (!user) {
                throw new Error("User not found");
            }

            // Provjera lozinke
            const isPasswordValid = await bcrypt.compare(userData.password, user.password);
            if (!isPasswordValid) {
                throw new Error("Invalid password");
            }

            // generiranje JWT tokena
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
