import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Badge, Button, Spinner } from 'react-bootstrap';
import { Calendar, MapPin, Users, Flag, Clock, Award, DollarSign } from 'lucide-react';
import "./SingleTournament.css"
import { getTournament } from '../../../services/api';
import { useParams } from 'react-router-dom';

export default function SingleTournament() {
  const [tournament, setTournament] = useState(null);
  const {id} = useParams()

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Arrivo': return '#2D572C';
      case 'In Corso': return '#E5BE01';
      case 'Terminato': return '#FF0000';
      default: return '#5E4285';
    }
  };


  useEffect(() => {
    const fetchTournament = async () => {
      try {
        const tournamentData = await getTournament(id);
        setTournament(tournamentData.data)
      } catch (error) {
        console.error("Errore nel caricamento del post: ", error)
      }
    };

    fetchTournament();
  })

  if (!tournament) {
    return (
      <Spinner animation="border" role="status" variant='lite'>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return (
    <Container className="py-5 tournament-page">
      <Row>
        <Col lg={8}>
          <Card className="mb-4 main-card">
            {/* <Card.Img variant="top" src={tournament.image || "/api/placeholder/800/400"} alt={tournament.name} /> */}
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h1 className="tournament-title">{tournament.name}</h1>
                <Badge bg="custom" style={{ backgroundColor: getStatusColor(tournament.status) }}>
                  {tournament.status}
                </Badge>
              </div>
              <p className="tournament-description">{tournament.rules}</p>
              <div className="info-grid">
                <div className="info-item">
                  <Calendar size={20} />
                  <span>Inizio: {new Date(tournament.startDate).toLocaleDateString()}</span>
                </div>
                <div className="info-item">
                  <Flag size={20} />
                  <span>Fine registrazione: {new Date(tournament.endRegistrationDate).toLocaleDateString()}</span>
                </div>
                <div className="info-item">
                  <MapPin size={20} />
                  <span>{tournament.location}</span>
                </div>
                <div className="info-item">
                  <Users size={20} />
                  <span>{tournament.participants} partecipanti</span>
                </div>
                <div className="info-item">
                  <Award size={20} />
                  <span>Formato: {tournament.format}</span>
                </div>
              </div>
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Body>
              <h3>Regolamento</h3>
              <p>{tournament.rules}</p>
            </Card.Body>
          </Card>

          {/* <Card>
            <Card.Body>
              <h3>Premi</h3>
              <ul className="prizes-list">
                {tournament.prizes.map((prize, index) => (
                  <li key={index} className="prize-item">
                    <DollarSign size={20} />
                    <span>{prize}</span>
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card> */}
        </Col>

        <Col lg={4}>
          <Card className="mb-4 registration-card">
            <Card.Body>
              <h3>Iscrizione</h3>
              <p>Quota: €{tournament.price}</p>
              <p>Scadenza: {new Date(tournament.endDate).toLocaleDateString()}</p>
              <Button variant="primary" size="lg">Iscriviti ora</Button>
            </Card.Body>
          </Card>

          <Card className="organizer-card">
            <Card.Body>
              <h3>Organizzatore</h3>
              <p>{tournament.organizer}</p>
              <p>Email: {tournament.organizer}</p>
              <p>Telefono: {tournament.organizer}</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}