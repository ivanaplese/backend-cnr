import express from "express";
import cors from "cors";
//import { MongoClient } from 'mongodb';
import { userMethods } from "./Handlers/userHandler.js";
//import db from "./db/connection.js";
import dotenv from "dotenv";
import auth from "./auth.js";

const app = express();
const port = 3000; //port na kojem je server


app.use(express.json());
app.use(cors());
dotenv.config();

//user registracija
app.post("/register", async (req, res) => {
    let userData = req.body;

    try {
        await auth.registerUser(userData);
        res.status(201).json({ message: "user je uspješno dodan." });
    } catch (e) {
        if (e.message === "username already exists") {
            res.status(409).json({ error: e.message });
        } else {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
});

// user login
app.post("/login", async (req, res) => {
    const userData = req.body;

    try {
        const token = await auth.loginUser(userData);
        res.status(200).json({ token });
    } catch (e) {
        if (e.message === "User not found" || e.message === "Invalid password") {
            res.status(401).json({ error: e.message });
        } else {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
});

// ispis usera
app.get("/user", userMethods.getUser);

//dodavanje novog usera
app.post("/user", userMethods.newUser);

// dohvaćanje usera po id-u
app.get("/user/:id", userMethods.getUserById);

// dohvaćanje usera po username-u
app.get("/user/username/:username", userMethods.getUserByUsername);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

