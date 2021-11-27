import { React, useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';

import { Form, Button } from 'react-bootstrap';

import './new-trip-button.css';

const NewTripButton = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = event => {
    event.preventDefault();
  };

  const [formStep, setFormStep] = useState(0);

  useEffect(() => {
    setTimeout(() => {setFormStep(0)}, 500)
  }, [show]);
  
  console.log(handleClose)
  return (
    <div>
      <button type="button" onClick={handleShow} className="new-trip-button">
        +
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Adicione sua viagem</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {formStep === 0 && (
            <section>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Qual o destino?</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" />
              </Form.Group>
            </section>)}
            {formStep === 1 && (
            <section>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Quais os dias?</Form.Label>
                <Form.Control as="textarea" rows={3} />
              </Form.Group>
            </section>)}
            {formStep === 2 && (
            <section>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Adicione uma descrição</Form.Label>
                <Form.Control as="textarea" rows={3} />
              </Form.Group>
            </section>)}
            {formStep === 3 && (
            <section>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Adicione uma foto</Form.Label>
                <Form.Control type="file" />
              </Form.Group>
            </section>)}
            {formStep < 3
              ? <Button type="button" size="lg" onClick={() => setFormStep(formStep + 1)} className="register-submit-button">Próximo passo</Button>
              : <Button type="submit" size="lg" className="register-submit-button">Enviar</Button>
            }
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default NewTripButton;
