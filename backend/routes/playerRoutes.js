import express from 'express';
import Player from '../models/Player.js';

const router = express.Router();

// Rotta per aggiungere un giocatore (registrarsi)
router.post("/", async (req, res) => {
    try {
        const player = new Player(req.body);
        await player.save();
        res.status(201).json(player);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

// Rotta per ottenere tutti i giocatore
router.get("/", async (req, res) => {
    try {
        const players = await Player.find();
        res.json(players);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

// Rotta per ottenere un giocatore
router.get("/:id", async (req, res) => {
    try {
        const player = await Player.findById(req.params.id);
        if(!player) {
            res.status(404).json({message: "Player not found"});
        } else {
            res.json(player);
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

// Rotta per canellare un giocatore 
router.delete("/:id", async (req, res) => {
    try {
        const player = await Player.findByIdAndDelete(req.params.id);
        if(!player) {
            res.status(404).json({message: "Player non trovato"});
        } else {
            res.json({message: "Player eliminato"});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

// Rotta per modificare un giocatore
router.patch("/:id", async (req, res) => {
    try {
        const player = await Player.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!player) {
            res.status(404).json({messagge: "Player non trovato"})
        } else {
            res.json(player);
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

export default router;
