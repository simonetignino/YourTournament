import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./MyNavbar.css";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { CircleUserRound } from "lucide-react";

function MyNavbar({ setIsLogged }) {
  // Funzione per il logout
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLogged(false);
    navigate("/");
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
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">Accedi</NavDropdown.Item>
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
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
        <Dropdown className="profile-settings" drop="start">
          <Dropdown.Toggle  variant="custom" id="dropdown-basic">
            <CircleUserRound />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
