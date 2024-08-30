import { useEffect, useState } from "react";
import { Row, Col, Card, Badge } from "react-bootstrap";
import { getMe, getTournaments } from "../../../services/api";
import { Link } from "react-router-dom";
import TournamentCard from "../Tournament/TournamentCard";

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
    <TournamentCard tournaments={tournaments} />
  );
}
