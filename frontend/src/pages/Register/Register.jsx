import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { createPlayer } from "../../../services/api";

export default function Register() {
  const [player, setPlayer] = useState({
    name: "",
    surname: "",
    email: "",
    nickname: "",
    avatar: "",
    officialTeam: "",
    position: "",
    age: "",
    nationality: "",
    birthday: "",
    password: "",
    googleId: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlayer({ ...player, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(player).forEach((key) => {
        formData.append(key, player[key]);
      });
      await createPlayer(formData);
      navigate("/");
    } catch (error) {
      console.error("errore nella creazione del player", error);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center mt-5">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicName">
          <Form.Control
            className="mb-1"
            type="text"
            name="name"
            placeholder="Nome"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicSurname">
          <Form.Control
            className="mb-1"
            type="text"
            name="surname"
            placeholder="Cognome"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Control
            className="mb-1"
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Registrati
        </Button>
      </Form>
    </div>
  );
}
