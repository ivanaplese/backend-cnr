import db from "../db/connection.js";

const userCollection = db.collection("user");


// Dodavanje novog usera
export const newUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await userCollection.insertOne({
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

export const GetUser = async (req, res) => {
    try {
        const result = await userCollection.find().toArray();
        res.json()
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const userMethods = {
    newUser,
    GetUser,
};
