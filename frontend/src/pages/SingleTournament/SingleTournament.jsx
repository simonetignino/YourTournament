import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Badge, Button, Spinner } from 'react-bootstrap';
import { Calendar, MapPin, Users, Flag, Award, Settings } from 'lucide-react';
import "./SingleTournament.css"
import { getMe, getTournament, updateTournament } from '../../../services/api';
import { Link, useParams } from 'react-router-dom';

export default function SingleTournament() {
  const [tournament, setTournament] = useState(null);
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [participants, setParticipants] = useState();
  const [participantsList, setParticipantsList] = useState([]);
  const [isParticipant, setIsParticipant] = useState();
  const [bracket, setBracket] = useState([]); // Stato per salvare il tabellone

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Arrivo': return '#2D572C';
      case 'In Corso': return '#E5BE01';
      case 'Terminato': return '#FF0000';
      default: return '#5E4285';
    }
  };

  useEffect(() => {
    const fetchTournamentAndUser = async () => {
      try {
        const tournamentData = await getTournament(id);
        setTournament(tournamentData.data);
        setParticipants(tournamentData.data.participantsCount);
        setParticipantsList(tournamentData.data.participants);
        const userData = await getMe();
        setUser(userData);
        const userIsParticipant = tournamentData.data.participants.some(
          participant => participant._id === userData._id
        );
        setIsParticipant(userIsParticipant);
      } catch (error) {
        console.error("Errore nel caricamento del post: ", error);
        console.error("Errore nel recupero dei dati utente", error);
      }
    };
    fetchTournamentAndUser();
  }, []);

  const joinTournament = async () => {
    try {
      if (isParticipant) {
        alert("Sei già iscritto a questo torneo.");
        return;
      }

      const updatedParticipants = [...tournament.participants, user];

      const updatedTournament = {
        ...tournament,
        participants: updatedParticipants,
        participantsCount: updatedParticipants.length
      };

      const response = await updateTournament(id, updatedTournament);

      setTournament(response.data);
      setParticipants(updatedParticipants.length);
      setParticipantsList(updatedParticipants);
      setIsParticipant(true);
      alert("Iscrizione avvenuta con successo, buona fortuna!");
    } catch (error) {
      console.error("Impossibile partecipare al torneo", error);
    }
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const createBracket = () => {
    try {
      const shuffledParticipants = shuffleArray([...participantsList]);
      const totalRounds = Math.ceil(Math.log2(shuffledParticipants.length)); // Numero totale di turni
      const bracketRounds = [];

      let currentRound = shuffledParticipants.map(participant => ({ team1: participant, team2: null, winner: null }));

      for (let round = 0; round < totalRounds; round++) {
        const nextRound = [];
        for (let i = 0; i < currentRound.length; i += 2) {
          const match = {
            team1: currentRound[i]?.team1,
            team2: currentRound[i + 1]?.team1 || null, // Verifica se c'è un secondo partecipante
            winner: null
          };
          nextRound.push(match);
        }
        bracketRounds.push(nextRound);
        currentRound = nextRound;
      }

      setBracket(bracketRounds);
    } catch (error) {
      console.error("Impossibile creare il tabellone", error);
    }
  };

  if (!tournament) {
    return (
      <div className="d-flex align-items-center justify-content-center">
        <Spinner className="" variant="light" animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <Container className="py-5 tournament-page">
      <Row>
        <Col lg={8}>
          <Card className="mb-4 main-card">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h1 className="tournament-title">{user.email === tournament.organizer.email  && <Link className='me-2' to={`/tournaments/${tournament._id}/edit`}><Settings size={20}/></Link>}{tournament.name}</h1>
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
                  <span>{tournament.participantsCount} partecipanti</span>
                </div>
                <div className="info-item">
                  <Award size={20} />
                  <span>Formato: {tournament.format}</span>
                </div>
              </div>
            </Card.Body>
          </Card>

          <Card className="mb-4 rules">
            <Card.Body>
              <h3>Regolamento</h3>
              <p>{tournament.rules}</p>
            </Card.Body>
          </Card>
          
          {/* Bracket */}
          <Card className="mb-4 matchs-list">
            <Card.Body>
              {user.email === tournament.organizer.email ? <Button onClick={createBracket}>Genera Bracket</Button> : <p className='text-white p-0 m-0 '>Prossimamente...</p>}
              {bracket.length > 0 && (
                <div className="bracket">
                  <h3>Tabellone degli Incontri</h3>
                  {bracket.map((round, roundIndex) => (
                    <div key={roundIndex} className="round">
                      <h4>Round {roundIndex + 1}</h4>
                      {round.map((match, matchIndex) => (
                        <div key={`${roundIndex}-${matchIndex}`} className="match">
                          <div>{roundIndex < 1 ? (match.team1?.name) : "Da stabilire"}</div>
                          <div>VS</div>
                          <div>{roundIndex < 1 ? (match.team2?.name) : "Da stabilire"}</div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </Card.Body>
          </Card>

          
          {/* Lista partecipanti */}
          <Card className="mb-4 rules">
            <Card.Body>
              <h3>Lista Partecipanti</h3>
              {participantsList.length > 0 ? participantsList.map((participant, index) => (
                <p className='participants-list' style={{ backgroundColor: index % 2 === 0 ? '#433952' : '#5E4285', color: index % 2 === 0 ? "#B0BEC5": "#E0E0E0" }} key={participant._id}>
                  {participant.name}
                </p>
              )) : <p>Ancora nessun partecipante...</p>}
            </Card.Body>
          </Card>

        </Col>

        <Col lg={4}>
          <Card className="mb-4 registration-card">
            <Card.Body>
              <h3>Iscrizione</h3>
              <p>Quota: {tournament.price > 0 ? `€${tournament.price}` : "Gratis"}</p>
              <p>Scadenza: {new Date(tournament.endRegistrationDate).toLocaleDateString()}</p>
              {isParticipant ? <Button onClick={joinTournament} variant="success" size="lg">Già iscritto</Button> : <Button onClick={joinTournament} variant="primary" size="lg">Partecipa</Button>}
            </Card.Body>
          </Card>

          <Card className="organizer-card">
            <Card.Body>
              <h3>Organizzatore: {tournament.organizer.nickname.length > 0 ? tournament.organizer.nickname : tournament.organizer.name}</h3>
              <p>Email: {tournament.organizer.email}</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
