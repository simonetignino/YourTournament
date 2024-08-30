import React from 'react';
import { Button, Form } from 'react-bootstrap';

export default function CreateTournament() {
// TO DO - AGGIUNGERE FUNZIONE PER CREARE IL TORNEO 

  return (
    <div className="d-flex align-items-center justify-content-center mt-5">
      <Form>
        <Form.Group controlId="formBasicName">
          <Form.Control
            className="mb-1"
            type="text"
            name="Title"
            placeholder="Titolo"
          />
        </Form.Group>
        <Form.Group controlId="formBasicSurname">
          <Form.Control
            className="mb-1"
            type="text"
            name="game"
            placeholder="Gioco"
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Control
            className="mb-1"
            type="text"
            name="description"
            placeholder="Descrizione"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="text"
            name="limit"
            placeholder="Limite giocatori/squadre"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Aggiungi
        </Button>
      </Form>
    </div>
  );
}