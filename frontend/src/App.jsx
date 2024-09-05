import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MyNavbar from "./components/Navbar/MyNavbar";
import { useEffect, useState } from "react";
import { getTournaments } from "../services/api";
import Container from "react-bootstrap/esm/Container";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Register from "./pages/Register/Register";
import { Button } from "react-bootstrap";
import axios from "axios";
import CreateTournament from "./pages/CreateTorunament/CreateTournament"
import SingleTournament from "./pages/SingleTournament/SingleTournament"
import EditTournament from "./pages/EditTournament/EditTournament"
import EditProfile from "./pages/EditProfile/EditProfile"

function App() {
  const [isLogged, setIsLogged] = useState();
  const [games, setGames] = useState([]);

  // const fetchGames = async () => {
  //   const client_id = import.meta.env.REACT_APP_CLIENT_ID;
  //   const access_token = import.meta.env.REACT_APP_ACCESS_TOKEN;
  //   try {
  //     const response = await fetch("https://api.igdb.com/v4/games", {
  //       method: "POST",
  //       headers: {
  //         'Accept': "application/json",
  //         "Client-ID": client_id,
  //         "Authorization": `Bearer ${access_token}`,
  //       },
  //       body: "fields name,summary,rating; limit 10;",
  //     });
  //     console.log(response);
  //     setGames(response.data);
  //   } catch (error) {
  //     console.error("Errore nel caricamento dei giochi", error);
  //   }
  // };

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("token");
      setIsLogged(!!token);
    };

    // controllo lo stato del login all'avvio'
    checkLoginStatus();

    // Utilizzo un event listener per controllare lo stato di login
    window.addEventListener("storage", checkLoginStatus);

    // Rimuovi l'event listener quando il componente viene smontato
    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);

  return (
    <Router>
      <MyNavbar setIsLogged={setIsLogged} />
      {/* <Button onClick={fetchGames}>getGames</Button> */}
      <Container>
        <Routes>
          <Route
            path="/"
            element={
              isLogged ? (
                <Home />
              ) : (
                <Login isLogged={isLogged} setIsLogged={setIsLogged} />
              )
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<CreateTournament />} />
          <Route path="/tournaments/:id" element={<SingleTournament />} />
          <Route path="/tournaments/:id/edit" element={<EditTournament />} />
          <Route path="/players/:id/edit" element={<EditProfile />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
