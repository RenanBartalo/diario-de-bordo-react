/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import FileBase from 'react-file-base64';

import { useFormik } from 'formik';

import { editOneDay } from '../../services/api';

const EditDayButton = ({ day, update, setUpdate }) => {
  const dayId = day._id;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [photoX, setPhoto] = useState(day.photos);
  const [formStep, setFormStep] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setFormStep(0);
    }, 500);
  }, [show]);

  const stepOneForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      dia: day.dia,
    },
    onSubmit: () => {
      setFormStep(1);
    },
  });

  const stepTwoForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      description: day.description,
    },
    onSubmit: () => {
      setFormStep(2);
    },
  });

  const stepThreeForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      photos: photoX,
    },
    onSubmit: async (formData) => {
      try {
        const data = {
          ...stepOneForm.values,
          ...stepTwoForm.values,
          ...stepThreeForm.values,
          ...formData,
        };
        const token = localStorage.getItem('token');

        await editOneDay(data, dayId, token);
        handleClose();
        await setUpdate(!update);
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <div>
      <Button onClick={handleShow}>
        Editar
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Conte sobre o seu dia:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {formStep === 0 && (
          <Form onSubmit={stepOneForm.handleSubmit}>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>Qual o dia?</Form.Label>
              <Form.Control
                name="dia"
                onChange={stepOneForm.handleChange}
                onBlur={stepOneForm.handleBlur}
                isValid={stepOneForm.touched.dia && !stepOneForm.errors.dia}
                isInvalid={stepOneForm.touched.dia && stepOneForm.errors.dia}
                type="text"
                placeholder="ex. Paris"
                value={stepOneForm.values.dia}
              />
            </Form.Group>
            <Button
              type="submit"
              size="lg"
              className="register-submit-button"
            >
              Próximo passo
            </Button>
          </Form>
          )}
          {formStep === 1 && (
            <Form onSubmit={stepTwoForm.handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Adicione uma descrição</Form.Label>
                <Form.Control
                  name="description"
                  onChange={stepTwoForm.handleChange}
                  onBlur={stepTwoForm.handleBlur}
                  isValid={
                    stepTwoForm.touched.description && !stepTwoForm.errors.description
                  }
                  isInvalid={
                    stepTwoForm.touched.description && stepTwoForm.errors.description
                  }
                  as="textarea"
                  rows={3}
                  value={stepTwoForm.values.description}
                />
                <Form.Control.Feedback type="invalid">
                  {stepThreeForm.errors.description}
                </Form.Control.Feedback>
              </Form.Group>
              <Button
                type="submit"
                size="lg"
                className="register-submit-button"
              >
                Próximo passo
              </Button>
            </Form>
          )}
          {formStep === 2 && (
            <Form onSubmit={stepThreeForm.handleSubmit}>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Adicione uma foto para o seu dia:</Form.Label>
                <FileBase name="photos" type="file" multiple={false} value={stepThreeForm.values.photos} onDone={({ base64 }) => setPhoto(base64)} />
                <Form.Control.Feedback type="invalid">
                  {stepThreeForm.errors.photos}
                </Form.Control.Feedback>
              </Form.Group>
              <Button
                type="submit"
                size="lg"
                className="register-submit-button"
              >
                Enviar
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EditDayButton;
