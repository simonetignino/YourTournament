import mongoose from "mongoose";

const tournamentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rules: {type: String},
  location: {type: String},
  startDate: {type: Date},
  endDate: {type: Date},
  game: {type: String},
  organizer: {type: String},
  prize: {type: String},
  status: {type: String, enum: ["upcoming", "ongoing", "finished"]},
}, 
{collection: "tournaments", timestamps: true}
);

const Tournament = mongoose.model("Tournament", tournamentSchema);

export default Tournament;