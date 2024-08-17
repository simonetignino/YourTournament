import { useEffect, useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { getMe, getTournaments } from "../../../services/api";

export default function SoonTournaments() {
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
    <Row xs={1} sm={2} md={3} lg={4} className="g-4 justify-content-center">
      {tournaments.map((tournament) => (
        <Col key={tournament._id}>
          <Card className="h-100 shadow-sm hover-effect">
            <Card.Body className="d-flex flex-column">
              <Card.Title className="fw-bold mb-3">
                {tournament.name}
              </Card.Title>
              <div className="mt-auto d-flex justify-content-between align-items-center">
                <Badge bg="light" text="dark" className="read-time">
                  <i className="bi bi-clock me-1"></i>
                  {tournament.location}
                </Badge>
                <small className="text-muted">
                  {new Date(tournament.startDate).toLocaleDateString()}
                </small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
