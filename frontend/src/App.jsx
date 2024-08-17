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
  const [isLogged, setIsLogged] = useState(false);

  return (
    <Router>
      <MyNavbar />
      <Container>
        <Routes>
          <Route path="/" element={isLogged ? <Home /> : <Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
