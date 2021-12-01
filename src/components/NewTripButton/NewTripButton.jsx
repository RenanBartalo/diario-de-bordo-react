/* eslint-disable no-console */
import { React, useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import * as yup from 'yup';

import { Form, Button } from 'react-bootstrap';

import './new-trip-button.css';

const NewTripButton = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
<<<<<<< HEAD
  const handleSubmit = (event) => {
=======
  const handleChange = async (e) => {
    console.log(e.target.value);
  };
  const handleSubmit = event => {
>>>>>>> cda6f984c0aebaa059d99b114e78416691f58fad
    event.preventDefault();
  };

  const [formStep, setFormStep] = useState(0);

  useEffect(() => {
    setTimeout(() => { setFormStep(0); }, 500);
  }, [show]);

  console.log(handleClose);
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
                <Form.Control
                type="text"
                placeholder="ex. Paris"
                onChange={handleChange}
                />
              </Form.Group>
<<<<<<< HEAD
            </section>
            )}
=======
              <Button type="button" size="lg" onClick={() => setFormStep(formStep + 1)} className="register-submit-button">Próximo passo</Button>
            </section>)}
>>>>>>> cda6f984c0aebaa059d99b114e78416691f58fad
            {formStep === 1 && (
            <section>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Data inicial</Form.Label>
                <Form.Control
                type="date"
                onChange={handleChange}
                min="2021-10-30"
                max="2099-12-31"
                />
                <Form.Label className="mt-3">Data final</Form.Label>
                <Form.Control
                onChange={handleChange}
                max="2099-12-31"
                type="date" />
              </Form.Group>
<<<<<<< HEAD
            </section>
            )}
=======
              <Button type="button" size="lg" onClick={() => setFormStep(formStep + 1)} className="register-submit-button">Próximo passo</Button>
            </section>)}
>>>>>>> cda6f984c0aebaa059d99b114e78416691f58fad
            {formStep === 2 && (
            <section>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Adicione uma descrição</Form.Label>
                <Form.Control
                as="textarea"
                rows={3}
                onChange={handleChange}
                />
              </Form.Group>
<<<<<<< HEAD
            </section>
            )}
=======
              <Button type="button" size="lg" onClick={() => setFormStep(formStep + 1)} className="register-submit-button">Próximo passo</Button>
            </section>)}
>>>>>>> cda6f984c0aebaa059d99b114e78416691f58fad
            {formStep === 3 && (
            <section>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Adicione uma foto</Form.Label>
                <Form.Control
                type="file"
                onChange={handleChange}
                />
              </Form.Group>
            </section>
            )}
            {formStep < 3
<<<<<<< HEAD
              ? <Button type="button" size="lg" onClick={() => setFormStep(formStep + 1)} className="register-submit-button">Próximo passo</Button>
              : <Button type="submit" size="lg" className="register-submit-button">Enviar</Button>}
=======
              ? undefined
              : <Button type="submit" size="lg" className="register-submit-button">Enviar</Button> }
>>>>>>> cda6f984c0aebaa059d99b114e78416691f58fad
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default NewTripButton;
