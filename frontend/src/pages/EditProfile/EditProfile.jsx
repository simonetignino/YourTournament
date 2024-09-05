import React, { useEffect, useState } from 'react';
import { Button, Card, Container, Form } from 'react-bootstrap';
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { deletePlayer, getPlayer, updatePlayer } from '../../../services/api';
import { Calendar, MapPin, FileText, Image, Gamepad2 } from 'lucide-react';
import "./EditProfile.css"

export default function UpdatePlayer() {
// TO DO - AGGIUNGERE FUNZIONE PER CREARE IL TORNEO 

  const {id} = useParams()
  const [player, setPlayer] = useState({
    name: "",
    surname: "",
    email: "",
    nickname: "",
    avatar: "",
    officialTeam: "",
    games: [],
    position: "",
    age: "",
    nationality: "",
    birthday: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const response = await getPlayer(id);
        setPlayer(response.data);
      } catch (error) {
        console.error("Errore nel recupero del player", error);
      }
    };
    fetchPlayer();
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlayer(prev => ({
      ...prev, 
      [name]: value
    }));
  }  

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const confirm = window.confirm("Sei sicuro di voler modificare il tuo account?")
      if(confirm) {
        const updatedPlayer = {...player};
        const response = await updatePlayer(id, updatedPlayer);
        setPlayer(response.data);
        navigate(`/players/${id}`);
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
        await deletePlayer(id)
      navigate("/")
      }
    } catch (error) {
      console.error("impossibile cancellare il torneo", error)
    }
  }


  return (
    <Container className="py-5 player-creation">
      <Card className="creation-card">
        <Card.Body>
          <h1 className="text-center mb-4">Modifica Account</h1>
          <Form >
            <Form.Group className="mb-3">
              <Form.Label><FileText size={20} /> Nome </Form.Label>
              <Form.Control className='custom-placeholder' name='name' type="text" value={player.name} onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label><FileText size={20} /> Cognome </Form.Label>
              <Form.Control className='custom-placeholder' name='surname' type="text" value={player.surname} onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label><FileText size={20} /> Nickaneme</Form.Label>
              <Form.Control className='custom-placeholder' name='nickname' type="text" value={player.nickname} onChange={handleChange}/>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label><Image size={20} /> Avatar</Form.Label>
              <Form.Control className='custom-placeholder' name='avatar' type="text" accept="image/*" value={player.avatar} onChange={handleChange}/>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label><FileText size={20} /> Email </Form.Label>
              <Form.Control className='custom-placeholder' name='email' type='text' value={player.email} onChange={handleChange}/>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label><FileText size={20} /> Età </Form.Label>
              <Form.Control className='custom-placeholder' name='age' type="number" value={player.age} onChange={handleChange}/>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label><FileText size={20} /> Team Ufficiale </Form.Label>
              <Form.Control className='custom-placeholder' name='officialTeam' type='text'  value={player.officialTeam} onChange={handleChange}/>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label><MapPin size={20} /> Nazionalità </Form.Label>
          <Form.Control className='custom-placeholder' name='nationality' type="text" value={player.nationality} onChange={handleChange}/>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label><Calendar size={20} /> Data di nascita</Form.Label>
              <Form.Control className='custom-placeholder' name='birthday' type="date" value={player.birthday} onChange={handleChange}/>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label><Gamepad2 size={20}/> Ruolo </Form.Label>
              <Form.Control className='custom-placeholder' name='position' type="text" value={player.position} onChange={handleChange}/>
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