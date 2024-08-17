import mongoose from "mongoose";
import Team from "./Team.js";
import bcrypt from "bcrypt";

const playerSchema = new mongoose.Schema({
    name: { type: String },
    surname: { type: String },
    email: { type: String },
    nickname: { type: String },
    avatar: { type: String },
    officialTeam: {
        type: String,
    },
    position: { type: String },
    age: { type: Number },
    nationality: { type: String },
    birthday: { type: Date },
    favoriteGames: { type: String },
    password: { type: String },
    googleId: { type: String },
}, { collection: "players", timestamps: true });

// Funzione per confrontare la password
playerSchema.methods.comparePassword = function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

// Middleware per l'hasing della password prima del salvataggio
playerSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

const Player = mongoose.model("Player", playerSchema);

export default Player;