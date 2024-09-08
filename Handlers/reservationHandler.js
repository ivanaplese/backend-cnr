import db from "../db/connection.js";
import { ObjectId } from "mongodb";

// Dodavanje nove rezervacije
export const addReservation = async (req, res) => {
    const { userId, rideId } = req.body;
    try {
        const result = await reservationCollection.insertOne({
            userId: new ObjectId(userId),
            rideId: new ObjectId(rideId),
            reservationDate: new Date()
        });
        res.status(201).json({ message: "Rezervacija je uspješno dodana.", id: result.insertedId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Dohvaćanje svih rezervacija za korisnika
export const getReservationsByUserId = async (req, res) => {
    const userId = req.params.userId;
    try {
        const reservations = await reservationCollection.find({ userId: new ObjectId(userId) }).toArray();
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Dohvaćanje svih rezervacija za određenu vožnju
export const getReservationsByRideId = async (req, res) => {
    const rideId = req.params.rideId;
    try {
        const reservations = await reservationCollection.find({ rideId: new ObjectId(rideId) }).toArray();
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Brisanje rezervacije
export const deleteReservation = async (req, res) => {
    const reservationId = req.params.id;
    try {
        const result = await reservationCollection.deleteOne({ _id: new ObjectId(reservationId) });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Rezervacija nije pronađena." });
        }
        res.json({ message: "Rezervacija je uspješno obrisana." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const reservationMethods = {
    addReservation,
    getReservationsByUserId,
    getReservationsByRideId,
    deleteReservation,
};