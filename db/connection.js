
import { MongoClient } from "mongodb";

const connectionString = "mongodb+srv://test:test@cluster0.vinwyba.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(connectionString, {
    tlsAllowInvalidCertificates: true, // Dodano za ignoriranje nevaljanih SSL certifikata
});


let db = null;

try {
    console.log("Trying to establish connection...");
    // Pokušaj konekciju s MongoDB serverom
    const conn = await client.connect();
    console.log("Connected to MongoDB!");

    // Postavi bazu podataka na 'cnr'
    db = conn.db("cnr");
} catch (e) {
    console.error("Error establishing connection:", e);
}

// Export baze podataka (ako nije uspješna konekcija, db će biti null)
export default db;



// import { MongoClient } from "mongodb";

// const connectionString = "mongodb+srv://test:test@cluster0.vinwyba.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// let db = null;

// const connectToDatabase = async () => {
//     if (db) {
//         return db;
//     }
//     try {
//         const client = new MongoClient(connectionString, {
//             tlsAllowInvalidCertificates: true,
//         });
//         const connection = await client.connect();
//         db = connection.db("cnr");
//         console.log("Connected to MongoDB!");
//         return db;
//     } catch (e) {
//         console.error("Error connecting to MongoDB:", e);
//         throw e;
//     }
// };

// export default connectToDatabase;