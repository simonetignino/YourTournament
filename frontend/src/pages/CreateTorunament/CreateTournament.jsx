import React, { useEffect, useState } from 'react';
import { Button, Card, Container, Form } from 'react-bootstrap';
import { Navigate, useNavigate } from "react-router-dom";
import { createTournament, getMe } from '../../../services/api';
import { Calendar, MapPin, FileText, Image, Gamepad2, Lock, LockOpen, Award } from 'lucide-react';
import "./CreateTournament.css"

export default function CreateTournament() {
// TO DO - AGGIUNGERE FUNZIONE PER CREARE IL TORNEO 

  const [tournament, setTournament] = useState({
    name: "",
    image: "",
    description: "",
    price: "",
    rules: "",
    location: "",
    startDate: "",
    endRegistrationDate: "",
    game: "",
    organizer: null,
    prize: "",
    private: true,
    partecipants: "",
    format: "",
    status: "In Arrivo",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getMe();
        setTournament((prevTournament) => ({...prevTournament, organizer: userData}))
      } catch (error) {
        console.error("Errore nel recupero dei dati utente", error);
        navigate("/login")
      }
    };
    fetchUserData();
  }, [navigate])


  const [isPrivate, setIsPrivate] = useState(true);

  // const handleChange = (e) => {
  //   const {name, value } = e.target;
  //   setTournament({...tournament, [name]: value})
  // }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTournament(prev => ({
      ...prev, 
      [name]: value
    }));
  }  

  const handleChangeCheck = (e) => {
    const {name, checked} = e.target;
    setTournament(prev => ({
      ...prev,
      [name]: checked
    }));
    setIsPrivate(checked)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createTournament(tournament);
      if (response && response.data._id) {
        navigate(`/tournaments/${response.data._id}`);
      } else {
        console.error("Unexpected response format:", response);
      }
    } catch (error) {
      console.error("Errore dettagliato:", error.response || error);
    }
  }


  return (
    <Container className="py-5 tournament-creation">
      <Card className="creation-card">
        <Card.Body>
          <h1 className="text-center mb-4">Crea un nuovo torneo</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label><FileText size={20} /> Nome del torneo</Form.Label>
              <Form.Control className='custom-placeholder' onChange={handleChange} name='name' type="text" placeholder="Inserisci il nome del torneo" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label><Image size={20} /> Immagine del torneo</Form.Label>
              <Form.Control className='custom-placeholder' onChange={handleChange} name='image' type="text" accept="image/*" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label><FileText size={20} /> Descrizione</Form.Label>
              <Form.Control className='custom-placeholder' onChange={handleChange} name='description' as="textarea" rows={3} placeholder="Inserisci una descrizione del torneo" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label><FileText size={20} /> Quota iscrizione</Form.Label>
              <Form.Control className='custom-placeholder' onChange={handleChange} name='price' type="number" placeholder="€" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label><FileText size={20} /> Regolamento</Form.Label>
              <Form.Control className='custom-placeholder' onChange={handleChange} name='rules' as="textarea" rows={5} placeholder="Inserisci il regolamento del torneo" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label><MapPin size={20} /> Luogo di svolgimento</Form.Label>
              <Form.Control className='custom-placeholder' onChange={handleChange} name='location' type="text" placeholder="Inserisci il luogo di svolgimento" />
            </Form.Group>

            <Form.Select className='mb-3' name='format' onChange={handleChange} aria-label="Default select example">
              <option>Formato</option>
              <option value="A Squadre">A Squadre</option>
              <option value="Singolo">Singolo</option>
              <option value="A Coppie">A Coppie</option>
            </Form.Select>

            <Form.Group>
            <Form.Select className='mb-3' name='status' onChange={handleChange} aria-label="Default select example">
              <option>Stato</option>
              <option value="In Arrivo">In Arrivo</option>
              <option value="In Corso">In Corso</option>
              <option value="Terminato">Terminato</option>
            </Form.Select>
            </Form.Group>
            

            <Form.Group className="mb-3">
              <Form.Label><Calendar size={20} /> Data di inizio del torneo</Form.Label>
              <Form.Control className='custom-placeholder' onChange={handleChange} name='startDate' type="date" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label><Calendar size={20} /> Data di fine registrazione</Form.Label>
              <Form.Control className='custom-placeholder' onChange={handleChange} name='endRegistrationDate' type="date" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label><Gamepad2 size={20}/> Gioco</Form.Label>
              <Form.Control className='custom-placeholder' onChange={handleChange} name='game' type="text" placeholder="Inserisci il nome del gioco" />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label><Gamepad2 size={20}/>Premio</Form.Label>
              <Form.Control className='custom-placeholder' onChange={handleChange} name='prize' type="text" placeholder="Montepremi" />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Check
                name='private'
                type="switch"
                id="privacy-switch"
                label={
                  <span className='private-or-not'>
                    {isPrivate ? <Lock size={20} /> : <LockOpen size={20} />}
                    {" "}Torneo {isPrivate ? "Privato" : "Pubblico"}
                  </span>
                }
                checked={isPrivate}
                onChange={handleChangeCheck}
              />
            </Form.Group>

            <div className="d-grid">
              <Button variant="primary" type="submit" size="lg">
                Crea Torneo
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}