import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../../../services/api";

function Login({ setIsLogged }) {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    //Estraggo i parametri dall'url
    const params = new URLSearchParams(location.search);
    //Cerchiamo il token dentro l'url
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      window.dispatchEvent(new Event("storage"));
      window.dispatchEvent(new Event("loginStateChange"));
      navigate("/");
    }
  }, [location, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData);

      localStorage.setItem("token", response.token);
      window.dispatchEvent(new Event("storage"));
      navigate("/");
      // console.log("login effettuato con successo");
      setIsLogged(true);
    } catch (error) {
      console.error("errore durante il login", error);
      alert("Credenziali non valide. Riprova");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center mt-5">
      <Form className="w-25 d-flex flex-column" onSubmit={handleSubmit}>
        <h2 className="text-white">
          Accedi o <Link to={"/register"}>Registrati</Link>
        </h2>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
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
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Login;
