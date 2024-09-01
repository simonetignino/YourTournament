import mongoose from "mongoose";

const participantSchema = new mongoose.Schema({
    player: {
        type: Object
    },
    registrationDate: {
        type: Date,
        default: Date.now
    },
}, { _id: false });


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
    organizer: { type: Object },
    prize: { type: Number },
    private: { type: Boolean },
    participants: [participantSchema],
    participantsCount: { type: Number, default: 0 },
    format: { type: String, enum: ["A Squadre", "Singolo", "A Coppie"] },
    status: { type: String, enum: ["In Arrivo", "In Corso", "Terminato"] },
}, { collection: "tournaments", timestamps: true });

// Middleware per aggiornare automaticamente participantsCount
tournamentSchema.pre('save', function(next) {
    if (this.isModified('participants')) {
        this.participantsCount = this.participants.length;
    }
    next();
});

const Tournament = mongoose.model("Tournament", tournamentSchema);

export default Tournament;