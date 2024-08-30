import axios from "axios";

const API_URL = "http://localhost:5001"; // DA CAMBIARE PER IL DEPLOY
const api = axios.create({ baseURL: API_URL }); // istanza di axios

// TODO
// Aggiungo un interceptor per includere il token in tutte le richieste

// CHIAMATE PER I TORNEI
export const getTournaments = () => api.get("/tournaments");
export const getTournament = (id) => api.get(`/tournaments/${id}`);
export const createTournament = (tournamentData) =>
  api.post("/tournaments", tournamentData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const updateTournament = (id, tournamentData) =>
  api.patch(`/tournaments/${id}`, tournamentData);
export const deleteTournament = (id) => api.delete(`/tournaments/${id}`);

// CHIAMATE PER I GIOCATORI(UTENTI)
export const getPlayers = () => api.get("/players");
export const getPlayer = (id) => api.get(`/players/${id}`);
export const createPlayer = (playerData) =>
  api.post("/players", playerData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const updatePlayer = (id, playerData) =>
  api.patch(`/players/${id}`, playerData);
export const deletePlayer = (id) => api.delete(`/players/${id}`);

// CHIAMATE PER LE SQUADRE

// FUNZIONE PER GESTIONE UTENTE
// export const registerUser = (userData) =>
//     api.post("/players", userData, {
//         headers: {
//             "Content-Type": "multipart/form-data",
//         },
//     });

export const loginUser = async (credentials) => {
  try {
    const response = await api.post("/auth/login", credentials);
    console.log("Risposta API login:", response.data); // Log della risposta per debugging
    return response.data;
  } catch (error) {
    console.error("Errore nella chiamata API di login", error);
    throw error;
  }
};
export const getMe = async () => {
  try {
    const response = await api.get("/auth/me");
    return response.data;
  } catch (error) {
    console.error("Errore nel recupero dei dati utenti", error);
    throw error;
  }
};
