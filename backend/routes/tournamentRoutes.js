import express from "express";
import Tournament from "../models/Tournament.js";

const router = express.Router();

// Rotta per creare un nuovo torneo 
router.post("/", async(req, res) => {
    try {
        const tournament = new Tournament(req.body);
        await tournament.save();
        res.status(201).json(tournament);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Rotta per vedere tutti i tornei
router.get("/", async(req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const sort = req.query.sort || "name";
        const sortDirection = req.query.sortDirection || "dec" ? -1 : 1;
        const skip = (page - 1) * limit;
        let query = {};
        if (req.query.name) {
            query.name = { $regex: req.query.name, $options: "i" };
        }
        const tournaments = await Tournament.find(query).sort({
            [sort]: sortDirection
        }).skip(skip).limit(limit);
        const total = await Tournament.countDocuments();
        res.json({ tournaments, currentPage: page, totalPage: Math.ceil(total / limit), totalTournaments: total });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// Rotta per un singolo torneo
router.get("/:id", async(req, res) => {
    try {
        const tournament = await Tournament.findById(req.params.id);
        if (!tournament) {
            res.status(404).json({ message: "Torneo non trovato" });
        } else {
            res.json(tournament);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// Rotta per cancellare un torneo 
router.delete("/:id", async(req, res) => {
    try {
        const tournament = await Tournament.findByIdAndDelete(req.params.id);
        if (!tournament) {
            res.status(404).json({ message: "torneo non trovato" })
        } else {
            res.json({ message: "Torneo cancellato con successo" })
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// Rotta per modificare un torneo 
router.patch("/:id", async(req, res) => {
    try {
        const tournament = await Tournament.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!tournament) {
            res.status(404).json({ message: "Torneo non trovato" });
        } else {
            res.json(tournament);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

export default router;