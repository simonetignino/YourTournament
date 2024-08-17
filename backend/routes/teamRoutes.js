import express from "express";
import Team from "../models/Team.js";

const router = express.Router();

// Rotta per creare una nuova squadra
router.post("/", async (req, res) => {
    try {
        const team = new Team(req.body);
        await team.save();
        res.status(201).json(team);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

// Rotta per ottenere tutte le squadre
router.get("/", async (req, res) => {
    try {
        const teams = await Team.find();
        res.json(teams);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

// Rotta per ottenere una singola squadra
router.get("/:id", async (req, res) => {
    try {
        const team = await Team.findById(req.params.id);
        if(!team) {
            res.status(404).json({message: "Squadra non trovata"});
        } else {
            res.json(team);
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

// Rotta per eliminare una squadra
router.delete("/:id", async (req, res) => {
    try {
        const team = await Team.findByIdAndDelete(req.params.id);
        if(!team) {
            res.status(404).json({message: "Squadra non trovata"})
        } else {
            res.json({message: "Squadra eliminata con successo"}); 
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

// Rotta per modificare una squadra
router.patch("/:id", async (req, res) => {
    try {
        const team = await Team.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!team) {
            res.status(404).json({message: "Squadra non trovata"});
        } else {
            res.json(team);
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})



export default router;