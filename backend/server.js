import express from "express";
import mongoose from "mongoose";
import endpoints from "express-list-endpoints";
import cors from "cors";
import tournamentRoutes from "./routes/tournamentRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";
import playerRoutes from "./routes/playerRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import dotenv from "dotenv";
import multer from "multer";
import session from "express-session";

dotenv.config();

const app = express();
// const corsOptions = {
//     origin: function(origin, callback) {
//         // Definiamo una whitelist di origini consentite.
//         // Queste sono gli URL da cui il nostro frontend farà richieste al backend.
//         const whitelist = [
//             "http://localhost:5173", // Frontend in sviluppo
//             "https://mern-blog-part-v.vercel.app", // Frontend in produzione (prendere da vercel!)
//             "https://mern-blog-ctt3.onrender.com", // URL del backend (prendere da render!)
//         ];

//         if (process.env.NODE_ENV === "development") {
//             // In sviluppo, permettiamo anche richieste senza origine (es. Postman)
//             callback(null, true);
//         } else if (whitelist.indexOf(origin) !== -1 || !origin) {
//             // In produzione, controlliamo se l'origine è nella whitelist
//             callback(null, true);
//         } else {
//             callback(new Error("PERMESSO NEGATO - CORS"));
//         }
//     },
//     credentials: true, // Permette l'invio di credenziali, come nel caso di autenticazione
//     // basata su sessioni.
// };
app.use(cors());
app.use(express.json());

const upload = multer();
app.use("/players", upload.none(), playerRoutes);

// app.use(
//     session({
//         secret: process.env.SESSION_SECRET,
//         // dice al gestore di sessione di non salvare la sessione se non ci sono modifiche
//         resave: false,
//         // dice di non creare una sessione fino a quando non memorizzo qualcosa
//         saveUninitialized: false,
//     })
// );

app.use("/tournaments", tournamentRoutes);
app.use("/teams", teamRoutes);
app.use("/players", playerRoutes);
app.use("/auth", authRoutes);

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MONGOOSE CONNESSO"))
    .catch((err) => console.error("MINGIDB ERROR_", err));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server acceso sulla porta ${PORT}`);
    console.log("Sono disponibili i seguenti endpoints");
    console.table(endpoints(app));
});

export default app;