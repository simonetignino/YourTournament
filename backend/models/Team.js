import mongoose from "mongoose"

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  players: {
    // type: mongoose.Schema.Types.ObjectId,
    // ref: 'Player'
    type: Array,
  },
  logo: { type: String },
  nationality: { type: String },
  city: { type: String },
  founded: { type: Date },
  website: { type: String },
},
{collection: "teams", timestamps: true}
);

const Team = mongoose.model("Team", teamSchema);

export default Team;