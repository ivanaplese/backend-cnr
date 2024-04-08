import { MongoClient } from 'mongodb';
import { ServerApiVersion } from 'mongodb';

const uri = "mongodb+srv://test:test@cluster0.vinwyba.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

let db = null;


async function establishConnection() {
    try {
        // Connect the client to the server (optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        // Postavite db nakon uspostavljanja veze s bazom podataka
        db = client.db("cnr");
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

// Izložite db izvan run() funkcije
function getDb() {
    return db;
}

// Izvezi funkciju establishConnection i db objekt
export { establishConnection, getDb };