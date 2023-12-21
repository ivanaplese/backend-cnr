import express from 'express';
import cors from 'cors';
import { auto, voznja, user } from './store.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Dodavanje novog korisnika
app.post('/user', (req, res) => {
    const newUser = req.body;
    user.push(newUser);
    res.status(201).json(newUser);
});

// Pregled svih korisnika
app.get('/user', (req, res) => res.json(user));

// Pregled jednog korisnika po ID-u
app.get('/user/:userId', (req, res) => {
    const { userId } = req.params;
    const foundUser = user.find(user => user.id === userId);
    if (foundUser) {
        res.json(foundUser);
    } else {
        res.status(404).json({ message: 'Korisnik nije pronađen' });
    }
});

// Pregled svih dostupnih automobila za rentanje
app.get('/auto', (req, res) => res.json(auto));

// Dodavanje novog automobila u bazu
app.post('/auto', (req, res) => {
    const noviAuto = req.body;
    auto.push(noviAuto);
    res.status(201).json(noviAuto);
});

// Dodavanje podataka o putovanju i objava vožnje
app.post('/voznja', (req, res) => {
    const novaVoznja = req.body;
    voznja.push(novaVoznja);
    //Ovdje planiram nadalje napraviti provjeru za dostupnost automobila za rentanje 
    res.status(201).json(novaVoznja);
});

// Pregled svih objavljenih vožnji
app.get('/auto', (req, res) => res.json(voznja));

// Pridruživanje vožnji
app.post('/voznja/:voznjaId/join', (req, res) => {
    const { voznjaId } = req.params;
    // Logika za provjeru i pridruživanje korisnika odabranoj vožnji
    res.status(200).json({ message: `Joined ride ${voznjaId}` });
});

app.listen(port, () => console.log(`Server sluša na portu ${port}`));
