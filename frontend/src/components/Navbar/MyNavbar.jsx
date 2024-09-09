import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./MyNavbar.css";
import { Link, useNavigate } from "react-router-dom";
import { Offcanvas } from "react-bootstrap";
import { UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { getMe } from "../../../services/api";

function MyNavbar({ setIsLogged }) {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState({})

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getMe();
        setUser(userData)
      } catch (error) {
        console.error("impossibile recupera l'utente", error)
      }
    }
    fetchUser();
  }, [])

  // Funzione per il logout
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLogged(false);
    navigate("/login");
  };

  return (
    <Navbar expand="lg" className="rgb-border" id="navbar">
      <Container fluid>
        <Navbar.Brand href="#">
          <img id="logo-navbar" src="/src/assets/yourTournament.png" alt="" />
        </Navbar.Brand>
        <Navbar.Toggle className="custom-toggler" aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#action2">Come funziona?</Nav.Link>
            <NavDropdown title="Tornei" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">
                Partecipa a torneo
              </NavDropdown.Item>
              <NavDropdown.Item href="/create">Crea Torneo</NavDropdown.Item>              
              
            </NavDropdown>
          </Nav>
          {/* <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button id="button-search" variant="custom">
              Search
            </Button>
          </Form> */}
        </Navbar.Collapse>
        <Button className="rounded-circle p-0 m-0" variant="primary" onClick={handleShow}>
            <div className="profile-icon p-0 m-0 d-flex align-items-center justify-content-center">
              <UserRound className="p-0 m-0" />
            </div>
        </Button>

        <Offcanvas className="offcanvas-custom" placement="end" show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Gestisci profilo</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="d-flex flex-column">
            <Link className="mb-2" to={`/players/${user._id}/edit`}>Impostazioni account</Link>
            <Link className="mb-2" to={"/login"}>Accedi con un altro account</Link>
            <Link className="mb-2" onClick={handleLogout}>Logout</Link>
          </Offcanvas.Body>
        </Offcanvas>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
