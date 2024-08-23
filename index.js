import express from "express";
import cors from "cors";
import { userMethods } from "./Handlers/userHandler.js";
import { rideMethods } from "./Handlers/rideHandler.js";
import { reservationMethods } from "./Handlers/reservationHandler.js";
import dotenv from "dotenv";
import auth from "./auth.js";
import jwt from 'jsonwebtoken';

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.use(express.json());
app.use(cors());
dotenv.config();

app.use(cors({
    origin: 'https://cars-n-rides.netlify.app/'
}));




//USER RUTE

//user registracija
app.use('/api', (router) => {

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

    app.post("/voznja", authenticateToken, rideMethods.addRide); //ruta za dodavanje vožnja
    app.get("/voznja", rideMethods.searchRides); //pretraživanje vožnja
    app.get("/voznja/:id", rideMethods.getRideById); //pretraživanje vožnje po idu
    app.put("/voznja/:id", rideMethods.updateRide); //update vožnje po idu
    app.delete("/voznja/:id", rideMethods.deleteRide); //brisanje vožnje po idu

    // RUTE ZA REZERVACIJE
    app.post("/rezervacija", reservationMethods.addReservation); //dodavanje rezervacije
    // app.get("/rezervacija/user/:userId", reservationMethods.getReservationsByUserId); //pretrazivanje po user id , nisam sigurna jel radi- izbacuje prazno
    app.get("/rezervacija/voznja/:rideId", reservationMethods.getReservationsByRideId); //pretraživanje voznnje po ride id
    app.delete("/rezervacija/:id", reservationMethods.deleteReservation); //brisanje voznje



    app.post("/auth", async (req, res) => {
        let userData = req.body;
        try {
            const result = await auth.loginUser(
                userData.username,
                userData.password
            );
            return res.json({ token: result.token });
        } catch (error) {
            return res.status(403).json({ error: error.message });
        }
    });




    // Middleware za autentifikaciju
    const authenticateToken = (req, res, next) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) return res.sendStatus(401); // Ako nema tokena, vrati 401 Unauthorized

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) return res.sendStatus(403); // Ako token nije važeći, vrati 403 Forbidden
            req.user = user; // Spremi korisničke podatke u request objekt
            next(); // Nastavi s izvođenjem rute
        });
    };

});