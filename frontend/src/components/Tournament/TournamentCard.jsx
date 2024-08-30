import { Badge, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Users, Flag } from 'lucide-react';
import "./TournamentCard.css"

function TournamentCard ({ tournaments }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'In Arrivo': return '#2D572C';
      case 'In Corso': return '#E5BE01';
      case 'Terminato': return '#FF0000';
      default: return '#5E4285';
    }
  };

  return (
    <Row xs={1} sm={2} md={3} lg={4} className=" justify-content-center">
      {tournaments.map((tournament) => (
        <Col className="mb-5" key={tournament._id}>
          <Link to={`/tournaments/${tournament._id}`}>
            <Card className="h-100 shadow-sm hover-effect tournament-card">
              <Card.Img variant="top" src={tournament.image || "/api/placeholder/300/200"} alt={tournament.name} />
              <Card.Body className="d-flex flex-column">
                <Card.Title className="fw-bold mb-3">{tournament.name}</Card.Title>
                <div className="mb-2">
                  <Badge bg="custom" style={{ backgroundColor: getStatusColor(tournament.status) }}>
                    {tournament.status}
                  </Badge>
                </div>
                <div className="info-item">
                  <Calendar size={16} />
                  <span>Inizio: {new Date(tournament.startDate).toLocaleDateString()}</span>
                </div>
                <div className="info-item">
                  <Flag size={16} />
                  <span>Fine registrazione: {new Date(tournament.endRegistrationDate).toLocaleDateString()}</span>
                </div>
                <div className="info-item">
                  <MapPin size={16} />
                  <span>{tournament.location}</span>
                </div>
                <div className="info-item">
                  <Users size={16} />
                  <span>{tournament.participants} partecipanti</span>
                </div>
              </Card.Body>
            </Card>
          </Link>
        </Col>
      ))}
    </Row>
  )
}

export default TournamentCard;