import { verifyJWT } from "../utils/jwt.js";
import Player from "../models/Player.js";

const authMiddleware = async(req, res, next) => {
    try {
        // estraggo il token dell'header
        // replace (---) toglie il prefisso "Bearer" dal token
        // const token = req.headers.authorization?.replace("Bearer ", "");
        const token = req.headers.authorization ?
            req.headers.authorization.replace("Bearer ", "") :
            null;

        if (!token) {
            // se non c'è nessun token, rispondo con errore 401 UNAUTHORIZED
            return res.status(401).send("mbare, manca il token");
        }
        // Verifico/decodifico il token con una funzione dedicata (verifyJWT)
        const decoded = await verifyJWT(token);
        console.log("CLG AUTHMIDDLEWARE DECODED:", decoded);

        // sfrutto l'id dell'autore per trovare l'autore nel DB
        const player = await Player.findById(decoded.id).select("-password");
        console.log("CLG AUTHMIDDLEWARE AUTHOR:", player);

        // se l'autore non risulta nel db, rispondo con un 401
        if (!player) {
            return res.status(401).send("autore non trovato nel DB");
        }
        //passo l'autore alla request
        req.player = player;

        // passo al prossimo middleware
        next();
    } catch (err) {
        res.status(401).send(`Token non valido: ${err.message}`);
    }
};

export default authMiddleware;