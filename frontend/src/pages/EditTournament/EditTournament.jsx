import React, { useEffect, useState } from 'react';
import { Button, Card, Container, Form } from 'react-bootstrap';
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { deleteTournament, getTournament, updateTournament } from '../../../services/api';
import { Calendar, MapPin, FileText, Image, Gamepad2, Lock, LockOpen, Award } from 'lucide-react';
import "./EditTournament.css"

export default function UpdateTournament() {
// TO DO - AGGIUNGERE FUNZIONE PER CREARE IL TORNEO 

  const {id} = useParams()
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
    partecipantsCount: 0,
    partecipants: [],
    format: "",
    status: "In Arrivo",
    bracket: [],
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTournament = async () => {
      try {
        const response = await getTournament(id);
        setTournament(response.data);
      } catch (error) {
        console.error("Errore nel recupero del Torneo", error);
      }
    };
    fetchTournament();
  }, [id])


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

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const confirm = window.confirm("Sei sicuro di voler modificare il torneo?")
      if(confirm) {
        const updatedTournament = {...tournament};
        const response = await updateTournament(id, updatedTournament);
        setTournament(response.data);
        navigate(`/tournaments/${id}`);
      }
    } catch (error) {
      console.error("Errore dettagliato:", error.response || error);
    }
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const confirm = window.confirm("Sei sicuro di voler cancellare il torneo?")
      if(confirm) {
        await deleteTournament(id)
      navigate("/")
      }
    } catch (error) {
      console.error("impossibile cancellare il torneo", error)
    }
  }


  return (
    <Container className="py-5 tournament-creation">
      <Card className="creation-card">
        <Card.Body>
          <h1 className="text-center mb-4">Modifica Torneo</h1>
          <Form >
            <Form.Group className="mb-3">
              <Form.Label><FileText size={20} /> Nome del torneo</Form.Label>
              <Form.Control className='custom-placeholder' name='name' type="text" placeholder="Inserisci il nome del torneo" value={tournament.name} onChange={handleChange}/>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label><Image size={20} /> Immagine del torneo</Form.Label>
              <Form.Control className='custom-placeholder' name='image' type="text" accept="image/*" value={tournament.image} onChange={handleChange}/>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label><FileText size={20} /> Descrizione</Form.Label>
              <Form.Control className='custom-placeholder' name='description' as="textarea" rows={3} placeholder="Inserisci una descrizione del torneo" value={tournament.description} onChange={handleChange}/>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label><FileText size={20} /> Quota iscrizione</Form.Label>
              <Form.Control className='custom-placeholder' name='price' type="number" placeholder="€" value={tournament.price} onChange={handleChange}/>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label><FileText size={20} /> Regolamento</Form.Label>
              <Form.Control className='custom-placeholder' name='rules' as="textarea" rows={5} placeholder="Inserisci il regolamento del torneo" value={tournament.rules} onChange={handleChange}/>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label><MapPin size={20} /> Luogo di svolgimento</Form.Label>
              <Form.Control className='custom-placeholder' name='location' type="text" placeholder="Inserisci il luogo di svolgimento" value={tournament.location} onChange={handleChange}/>
            </Form.Group>

            <Form.Select className='mb-3' name='format' aria-label="Default select example" value={tournament.format} onChange={handleChange}>
              <option>Formato</option>
              <option value="A Squadre">A Squadre</option>
              <option value="Singolo">Singolo</option>
              <option value="A Coppie">A Coppie</option>
            </Form.Select>

            <Form.Group>
            <Form.Select className='mb-3' name='status' aria-label="Default select example" value={tournament.status} onChange={handleChange}>
              <option>Stato</option>
              <option value="In Arrivo">In Arrivo</option>
              <option value="In Corso">In Corso</option>
              <option value="Terminato">Terminato</option>
            </Form.Select>
            </Form.Group>
            

            <Form.Group className="mb-3">
              <Form.Label><Calendar size={20} /> Data di inizio del torneo</Form.Label>
              <Form.Control className='custom-placeholder' name='startDate' type="date" value={tournament.startDate} onChange={handleChange}/>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label><Calendar size={20} /> Data di fine registrazione</Form.Label>
              <Form.Control className='custom-placeholder' name='endRegistrationDate' type="date" value={tournament.endRegistrationDate} onChange={handleChange}/>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label><Gamepad2 size={20}/> Gioco</Form.Label>
              <Form.Control className='custom-placeholder' name='game' type="text" placeholder="Inserisci il nome del gioco" value={tournament.game} onChange={handleChange}/>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label><Gamepad2 size={20}/>Premio</Form.Label>
              <Form.Control className='custom-placeholder' name='prize' type="text" placeholder="Montepremi" value={tournament.prize} onChange={handleChange}/>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Check
                name='private'
                type="switch"
                value={tournament.private}
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

            <div className="d-flex align-items-center justify-content-center mt-5">
              <Button onClick={handleUpdate} className='me-3 ' variant="success" type="submit" size="lg">
                Conferma Modifiche 
              </Button>
              <Button onClick={handleDelete} className='ms-3' variant="danger" type="submit" size="lg">
                Elimina 
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}