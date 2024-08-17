import express from 'express';
import mongoose from 'mongoose';
import endpoints from 'express-list-endpoints';
import cors from 'cors';
import tournamentRoutes from './routes/tournamentRoutes.js';
import teamRoutes from './routes/teamRoutes.js';
import playerRoutes from './routes/playerRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/tournaments', tournamentRoutes);
app.use('/teams', teamRoutes);
app.use('/players', playerRoutes);

mongoose.connect(process.env.MONGO_URI).then(() => console.log("MONGOOSE CONNESSO")).catch((err) => console.error("MINGIDB ERROR_", err))
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server acceso sulla porta ${PORT}`);
    console.log("Sono disponibili i seguenti endpoints");
    console.table(endpoints(app));
  });

export default app;