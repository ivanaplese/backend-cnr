import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { userMethods } from "./Handlers/userHandler.js";
import { rideMethods } from "./Handlers/rideHandler.js";
// import { reservationMethods } from "./Handlers/reservationHandler.js";
import auth from "./auth.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;


// CORS middleware
app.use(cors({
    origin: ['http://localhost:8081'],
    // origin: ['https://frontend-cnr.onrender.com/', 'http://localhost:8081', 'http://localhost:8080'],
    methods: ['GET,HEAD,PUT,PATCH,POST,DELETE'],
    credentials: true
}));

app.use(express.json());

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Define a router for API routes
const router = express.Router();

// USER ROUTES

// User registration
router.post("/register", async (req, res) => {
    let userData = req.body;

    try {
        await auth.registerUser(userData);
        res.status(201).json({ message: "User successfully added." });
    } catch (e) {
        if (e.message === "username already exists") {
            res.status(409).json({ error: e.message });
        } else {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
});

// User login
router.post("/login", async (req, res) => {
    const userData = req.body;

    try {
        const token = await auth.loginUser(userData);
        res.status(200).json({ token });
    } catch (e) {
        console.log(e);
        if (e.message === "User not found" || e.message === "Invalid password") {
            res.status(401).json({ error: e.message });
        } else {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
});

// Route for getting users, adding users, and other user methods
router.get("/user", userMethods.getUser); // List users
router.post("/user", userMethods.newUser); // Add new user
// router.get("/user/:id", userMethods.getUserById); // Get user by ID
// router.get("/user/username/:username", userMethods.getUserByUsername); // Get user by username


// RIDE ROUTES

router.post("/voznja", rideMethods.addRide); // Add ride
router.get("/voznja", rideMethods.searchRides); // Search rides
// router.get("/voznja/:id", rideMethods.getRideById); // Get ride by ID
// router.put("/voznja/:id", rideMethods.updateRide); // Update ride by ID
// router.delete("/voznja/:id", rideMethods.deleteRide); // Delete ride by ID
// router.get("/user-rides", rideMethods.getRidesByUser);


// Use the router for API routes
app.use('/api', router);
