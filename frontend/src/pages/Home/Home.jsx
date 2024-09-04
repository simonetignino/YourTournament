import { useEffect, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { getTournaments } from "../../../services/api";
import "./Home.css";
import SoonTournaments from "../../components/Soon/SoonTournaments";
import { Link } from "react-router-dom";

function Home() {
  // funzione per l'estrazione dei tornei dal DB
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const response = await getTournaments();
        setTournaments(response.data.tournaments);
      } catch (error) {
        console.error("Errore nel caricamento dei tornei", error);
      }
    };

    fetchTournaments();
  }, []);

  // gestione del caricamento dei tornei
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        setIsLoading(true);
        const response = await getTournaments();
        setTournaments(response.data.tournaments);
      } catch (error) {
        console.error("Errore nel caricamento dei tornei", error);
        setError("Si è verificato un errore nel caricamento dei tornei");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTournaments();
  }, []);

  return (
    <>
      <Row>
        <Col>
          <h1 className="text-center mt-4 text-white rgb-border">
            Benvenuto, dai un occhiata ai nostri tornei!
          </h1>
          {/* <Row className="d-flex justify-content-center align-items-center flex-column mt-4">
            {isLoading ? (
              <p>Caricamento...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <Tournaments tournaments={tournaments} />
            )}
          </Row> */}
          <h1 className="text-white">Prossimamente...</h1>
          <Row>
            {isLoading ? (
              <div className="d-flex align-items-center justify-content-center">
                <Spinner className="" variant="light" animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
              
            ) : error ? (
              <p>{error} </p>
            ) : (
              <SoonTournaments />
            )}
          </Row>
        </Col>
      </Row> 
    </>
           
  );
}

export default Home;
