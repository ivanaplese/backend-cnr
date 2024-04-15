// import { MongoClient } from 'mongodb';
// import { ServerApiVersion } from 'mongodb';

// const uri = "mongodb+srv://test:test@cluster0.vinwyba.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// const client = new MongoClient(uri, {
//     serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//     }
// });

// let db = null;


// async function establishConnection() {
//     try {
//         // Connect the client to the server (optional starting in v4.7)
//         await client.connect();
//         // Send a ping to confirm a successful connection
//         await client.db("admin").command({ ping: 1 });
//         console.log("Pinged your deployment. You successfully connected to MongoDB!");


//         db = client.db("cnr");
//     } finally {

//         await client.close();
//     }
// }


// function getDb() {
//     return db;
// }


// export { establishConnection, getDb };
// export default db;




// import { MongoClient } from "mongodb";
// const connectionString =
//     "mongodb+srv://test:test@cluster0.vinwyba.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// const client = new MongoClient(connectionString);
// let conn = null;

// try {
//     console.log("Trying to establish connection...");
//     conn = await client.connect();
// } catch (e) {
//     console.error(e);
// }
// let db = conn.db("cnr");

// export default db;



// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://test:test@cluster0.vinwyba.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//     serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//     }
// });

// async function run() {
//     try {
//         // Connect the client to the server	(optional starting in v4.7)
//         await client.connect();
//         // Send a ping to confirm a successful connection
//         await client.db("admin").command({ ping: 1 });
//         console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     } finally {
//         // Ensures that the client will close when you finish/error
//         await client.close();
//     }
// }
// run().catch(console.dir);

import { MongoClient } from "mongodb";

const connectionString = "mongodb+srv://test:test@cluster0.vinwyba.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(connectionString);
let conn = null;


try {
    console.log("Trying to establish connection...");
    conn = await client.connect();
    console.log("Connected to MongoDB!");
} catch (e) {
    console.error("Error establishing connection:", e);
}

let db = conn.db("cnr")
export default db;
