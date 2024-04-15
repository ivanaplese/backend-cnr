import express from "express";
import cors from "cors";
import { MongoClient } from 'mongodb';
import { userMethods } from "./Handlers/userHandler.js";
import db from "./db/connection.js";

const app = express();
const port = 3000;


app.use(express.json());
app.use(cors());


app.post("/user", async (req, res) => {
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


app.post("/user", userMethods.newUser);

app.get("/user", userMethods.GetUser);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

/*
// // Ruta za registraciju korisnika 1
// app.post("/register", async (req, res) => {
//     try {
//         const db = getDb();
//         const { username, password } = req.body;

//         // Provjerite postoji li korisnik s istim korisničkim imenom
//         const existingUser = await db.collection("user").findOne({ username });

//         if (existingUser) {
//             return res.status(400).json({ error: "Korisnik već postoji" });
//         }

//         // Ako korisnik ne postoji, spremite novog korisnika u bazu podataka
//         await db.collection("user").insertOne({ username, password });

//         res.status(201).json({ message: "Registracija uspješna" });
//     } catch (error) {
//         console.error("Greška prilikom registracije korisnika", error);
//         res.status(500).json({ error: "Došlo je do interne greške prilikom registracije korisnika" });
//     }
// });


// ruta 2



// app.get('/users', async (req, res) => {
//     const db = getDb(); // Dohvati db objekt iz connection.js
//     const user = await db.collection("user").find().toArray();
//     res.json(user);
// });


// // Dodavanje novog korisnika
// app.post('/user', (req, res) => {
//     const newUser = req.body;
//     user.push(newUser);
//     res.status(201).json(newUser);
// });


// // Pregled svih korisnika
// app.get('/user', (req, res) => res.json(user));

// // Pregled jednog korisnika po ID-u
// app.get('/user/:userId', (req, res) => {
//     const { userId } = req.params;
//     const foundUser = user.find(user => user.id === userId);
//     if (foundUser) {
//         res.json(foundUser);
//     } else {
//         res.status(404).json({ message: 'Korisnik nije pronađen' });
//     }
// });

// // Pregled svih dostupnih automobila za rentanje
// app.get('/auto', (req, res) => res.json(auto));

// // Dodavanje novog automobila u bazu
// app.post('/auto', (req, res) => {
//     const noviAuto = req.body;
//     auto.push(noviAuto);
//     res.status(201).json(noviAuto);
// });

// // Dodavanje podataka o putovanju i objava vožnje
// app.post('/voznja', (req, res) => {
//     const novaVoznja = req.body;
//     voznja.push(novaVoznja);
//     //Ovdje planiram nadalje napraviti provjeru za dostupnost automobila za rentanje
//     res.status(201).json(novaVoznja);
// });

// // Pregled svih objavljenih vožnji
// app.get('/auto', (req, res) => res.json(voznja));

// // Pridruživanje vožnji
// app.post('/voznja/:voznjaId/join', (req, res) => {
//     const { voznjaId } = req.params;
//     // Logika za provjeru i pridruživanje korisnika odabranoj vožnji
//     res.status(200).json({ message: `Joined ride ${voznjaId}` });
// });


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); */