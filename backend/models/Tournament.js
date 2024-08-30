import mongoose from "mongoose";

const tournamentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String },
    description: { type: String },
    price: { type: Number },
    rules: { type: String },
    location: { type: String },
    startDate: { type: Date },
    endRegistrationDate: { type: Date },
    game: { type: String },
    organizer: { type: String },
    prize: { type: Number },
    private: { type: Boolean },
    participants: { type: Number },
    format: { type: String, enum: ["A Squadre", "Singolo", "A Coppie"] },
    status: { type: String, enum: ["In Arrivo", "In Corso", "Terminato"] },
}, { collection: "tournaments", timestamps: true });

const Tournament = mongoose.model("Tournament", tournamentSchema);

export default Tournament;