import db from "../db/connection.js";
import { ObjectId } from "mongodb";

let rideCollection;

async function getRideCollection() {
    if (!rideCollection) {
        const database = await db(); // Await the MongoDB connection
        rideCollection = database.collection("ride"); // Initialize the collection
    }
    return rideCollection;
}

// Dodavanje nove vožnje
export const addRide = async (req, res) => {
    const { origin, destination, date } = req.body;

    try {
        const rideCollection = await getRideCollection(); // Fetch collection
        const result = await rideCollection.insertOne({
            _id: new ObjectId(),
            origin,
            destination,
            date: new Date(date),
        });
        res.status(201).json({ message: "Vožnja je uspješno dodana.", id: result.insertedId });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

// Pretraživanje vožnji po polazištu, odredištu i datumu
export const searchRides = async (req, res) => {
    const { origin, destination, date } = req.query;
    try {
        const rideCollection = await getRideCollection(); // Fetch collection
        const query = {
            origin: origin || { $exists: true },
            destination: destination || { $exists: true },
            date: date ? new Date(date) : { $exists: true },
        };

        const rides = await rideCollection.find(query).toArray();
        if (rides.length === 0) {
            return res.status(404).json({ message: "Nema dostupnih vožnji za navedene kriterije." });
        }
        res.json(rides);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Dohvaćanje pojedinačne vožnje po ID-u
export const getRideById = async (req, res) => {
    const rideId = req.params.id;
    try {
        const rideCollection = await getRideCollection(); // Fetch collection
        const ride = await rideCollection.findOne({ _id: new ObjectId(rideId) });
        if (!ride) {
            return res.status(404).json({ message: "Vožnja nije pronađena." });
        }
        res.json(ride);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Ažuriranje vožnje
export const updateRide = async (req, res) => {
    const rideId = req.params.id;
    const { origin, destination, date } = req.body;
    try {
        const rideCollection = await getRideCollection(); // Fetch collection
        const result = await rideCollection.updateOne(
            { _id: new ObjectId(rideId) },
            { $set: { origin, destination, date: new Date(date) } }
        );
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "Vožnja nije pronađena." });
        }
        res.json({ message: "Vožnja je uspješno ažurirana." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Brisanje vožnje
export const deleteRide = async (req, res) => {
    const rideId = req.params.id;
    try {
        const rideCollection = await getRideCollection(); // Fetch collection
        const result = await rideCollection.deleteOne({ _id: new ObjectId(rideId) });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Vožnja nije pronađena." });
        }
        res.json({ message: "Vožnja je uspješno obrisana." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const rideMethods = {
    addRide,
    searchRides,
    getRideById,
    updateRide,
    deleteRide,
};
