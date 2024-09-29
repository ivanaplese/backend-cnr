import db from "../db/connection.js";
import { ObjectId } from "mongodb";


// ispis usera
export const getUser = async (req, res) => {
    try {
        //novo
        const db = await connectToDatabase();
        const userCollection = db.collection("user");
        //
        const result = await userCollection.find().toArray();
        res.json(result)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// dodavanje novog usera
export const newUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        //
        const db = await connectToDatabase();
        const userCollection = db.collection("user");
        //
        const result = await userCollection.insertOne({
            _id: new ObjectId(),
            username,
            password
        });
        res
            .status(201)
            .json({ message: "User je uspješno dodan.", id: result.insertedId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// trazenje jednog usera prema id-u
export const getUserById = async (req, res) => {
    const userId = req.params.id;

    try {
        //
        const db = await connectToDatabase();
        const userCollection = db.collection("user");
        //
        const user = await userCollection.findOne({ _id: new ObjectId(userId) });
        if (!user) {
            return res.status(404).json({ message: "Korisnik nije pronađen." });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// trazenje usera po username-u
export const getUserByUsername = async (req, res) => {
    const username = req.params.username;
    try {
        //
        const db = await connectToDatabase();
        const userCollection = db.collection("user");
        //
        const user = await userCollection.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "Korisnik nije pronađen." });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const userMethods = {
    newUser,
    getUser,
    getUserById,
    getUserByUsername
};
