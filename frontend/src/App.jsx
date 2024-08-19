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

function App() {
  const [isLogged, setIsLogged] = useState();

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
          <Route path="/register" element={<Register />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
