import { Col, Row, Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

function Tournaments({ tournaments }) {

  // Aggiungo un controllo
  if (!Array.isArray(tournaments)) {
    return <div className="text-white">Nessun torneo disponibile</div>;
  }

  return (
    <Row xs={1} sm={2} md={3} lg={4} className="g-4 justify-content-center">
      {tournaments.map((tournament) => (
        <Col key={tournament._id}>
          
            <Card className="h-100 shadow-sm hover-effect">
              <Card.Body className="d-flex flex-column">
                <Card.Title className="fw-bold mb-3">{tournament.name}</Card.Title>
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

export default Tournaments;