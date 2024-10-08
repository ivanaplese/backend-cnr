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


async function getUserCollection() {
    const database = await db(); // Povezivanje s bazom podataka
    return database.collection("user"); // Vrati kolekciju korisnika
}


// Dodavanje nove vožnje
export const addRide = async (req, res) => {
    const { origin, destination, date, userId } = req.body;

    try {
        const rideCollection = await getRideCollection(); // Fetch collection
        const result = await rideCollection.insertOne({
            _id: new ObjectId(),
            origin,
            destination,
            date: new Date(date),
            userId: new ObjectId(userId)
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
    console.log(origin);
    console.log(destination);
    console.log(date);

    try {
        const rideCollection = await getRideCollection();

        const query = {
            origin: origin || { $exists: true },
            destination: destination || { $exists: true },
        };


        if (date) {
            const startDate = new Date(date);
            startDate.setUTCHours(0, 0, 0, 0);
            const endDate = new Date(date);
            endDate.setUTCHours(23, 59, 59, 999);

            query.date = { $gte: startDate, $lte: endDate };
        }

        const rides = await rideCollection.find(query).toArray();
        console.log(rides);

        if (rides.length === 0) {
            console.log("Nema dostupnih vožnji za navedene kriterije.");
            return res.status(404).json({ message: "Nema dostupnih vožnji za navedene kriterije." });
        }

        // Convert each ride's date into YYYY-MM-DD format before sending response
        const formattedRides = rides.map(ride => ({
            ...ride,
            date: new Date(ride.date).toISOString().slice(0, 10), // Convert date to YYYY-MM-DD
        }));

        res.json(formattedRides);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

// Dohvaćanje vožnji za određenog korisnika
export const getRidesByUser = async (req, res) => {
    const { username } = req.query;

    try {
        const userCollection = await getUserCollection();
        const user = await userCollection.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "Korisnik nije pronađen." });
        }

        const rideCollection = await getRideCollection(); // Fetch collection
        const rides = await rideCollection.find({ userId: user._id }).toArray(); // Koristi user._id

        if (rides.length === 0) {
            return res.status(404).json({ message: "Nema dostupnih vožnji za ovog korisnika." });
        }

        res.json(rides);
    } catch (error) {
        console.log(error);
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
        const rideCollection = await getRideCollection();
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
    getRidesByUser,
    getRideById,
    updateRide,
    deleteRide,
};
