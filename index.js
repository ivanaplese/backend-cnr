import express from "express";
import cors from "cors";
//import { MongoClient } from 'mongodb';
import { userMethods } from "./Handlers/userHandler.js";
import { rideMethods } from "./Handlers/rideHandler.js";

//import db from "./db/connection.js";
import dotenv from "dotenv";
import auth from "./auth.js";

const app = express();
const port = 3000; //port na kojem je server


app.use(express.json());
app.use(cors());
dotenv.config();

//USER RUTE

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


app.get("/user", userMethods.getUser); // ispis usera
app.post("/user", userMethods.newUser); //dodavanje novog usera
app.get("/user/:id", userMethods.getUserById); // dohvaćanje usera po id-u
app.get("/user/username/:username", userMethods.getUserByUsername); // dohvaćanje usera po username-u


//RUTE ZA VOŽNJE

app.post("/voznja", rideMethods.addRide); //ruta za dodavanje vožnja
app.get("/voznja", rideMethods.searchRides); //pretraživanje vožnja
app.get("/voznja/:id", rideMethods.getRideById); //pretraživanje vožnje po idu
app.put("/voznja/:id", rideMethods.updateRide); //update vožnje po idu
app.delete("/voznja/:id", rideMethods.deleteRide); //brisanje vožnje po idu




app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

