/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import FileBase from 'react-file-base64';

import { useFormik } from 'formik';
import * as yup from 'yup';

import { editOneTravel } from '../../services/api';

const EditTravelButton = ({
  x, travel, setUpdate, update,
}) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [photoX, setPhoto] = useState(travel.photo);
  const [formStep, setFormStep] = useState(0);
  const travelId = x;
  useEffect(() => {
    setTimeout(() => {
      setFormStep(0);
    }, 500);
  }, [show]);
  const stepOneSchema = yup.object().shape({
    cidade: yup
      .string()
      .required('Campo obrigatório')
      .min(3, 'Mínimo de 3 caractéres')
      .max(100, 'Máximo de 100 caractéres'),
  });
  const stepTwoSchema = yup.object().shape({
    dataDeIda: yup
      .date()
      .required('Campo obrigatório'),
    dataDeVolta: yup
      .date()
      .when(
        'dataDeIda',
        (dataDeIda, schema) => (dataDeIda && schema.min(dataDeIda)),
      )
      .required('Campo obrigatório'),
  });
  const stepThreeSchema = yup.object().shape({
    description: yup
      .string()
      .required('Campo obrigatório')
      .min(15, 'Mínimo de 15 caractéres')
      .max(500, 'Máximo de 500 caractéres'),
  });
  const stepFourSchema = yup.object().shape({
    photo: yup
      .string(),
  });

  const stepOneForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      cidade: travel.cidade,
    },
    validationSchema: stepOneSchema,
    onSubmit: () => {
      setFormStep(1);
    },
  });

  const stepTwoForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      dataDeIda: travel.dataDeIda ? travel.dataDeIda.split('/').reverse().join('-') : '10/10/2010',
      dataDeVolta: travel.dataDeVolta ? travel.dataDeVolta.split('/').reverse().join('-') : '10/10/2010',
    },
    validationSchema: stepTwoSchema,
    onSubmit: () => {
      setFormStep(2);
    },
  });

  const stepThreeForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      description: travel.description,
    },
    validationSchema: stepThreeSchema,
    onSubmit: () => {
      setFormStep(3);
    },
  });
  const dayDiff = (a, b) => {
    const day1 = new Date(a);
    const day2 = new Date(b);

    const difference = Math.abs(day2 - day1);
    const numberDays = difference / (1000 * 3600 * 24);

    return numberDays;
  };
  const stepFourForm = useFormik({
    initialValues: {
      photo: photoX,
    },
    validationSchema: stepFourSchema,
    onSubmit: async (formData) => {
      try {
        const numDays = 0;
        const data = {
          ...stepOneForm.values,
          ...stepTwoForm.values,
          ...stepThreeForm.values,
          ...formData,
          ...numDays,
        };
        data.photo = photoX;
        data.numDays = dayDiff(data.dataDeIda, data.dataDeVolta);
        data.dataDeIda = data.dataDeIda.slice(0, 10).split('-').reverse().join('/');
        data.dataDeVolta = data.dataDeVolta.slice(0, 10).split('-').reverse().join('/');
        const token = localStorage.getItem('token');

        await editOneTravel(data, travelId, token);
        await setUpdate(!update);
        navigate(-1);
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className="ms-3">
      <Button onClick={handleShow}>
        Editar
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Adicione sua viagem</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {formStep === 0 && (
          <Form onSubmit={stepOneForm.handleSubmit}>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>Qual o destino?</Form.Label>
              <Form.Control
                name="cidade"
                onChange={stepOneForm.handleChange}
                onBlur={stepOneForm.handleBlur}
                isValid={stepOneForm.touched.cidade && !stepOneForm.errors.cidade}
                isInvalid={stepOneForm.touched.cidade && stepOneForm.errors.cidade}
                type="text"
                placeholder="ex. Paris"
                value={stepOneForm.values.cidade}
              />
              <Form.Control.Feedback type="invalid">
                {stepOneForm.errors.cidade}
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
          {formStep === 1 && (
            <Form onSubmit={stepTwoForm.handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Data inicial</Form.Label>
                <Form.Control
                  name="dataDeIda"
                  onChange={stepTwoForm.handleChange}
                  onBlur={stepTwoForm.handleBlur}
                  isValid={stepTwoForm.touched.dataDeIda && !stepTwoForm.errors.dataDeIda}
                  isInvalid={stepTwoForm.touched.dataDeIda && stepTwoForm.errors.dataDeIda}
                  type="date"
                  max="2099-12-31"
                  value={stepTwoForm.values.dataDeIda}
                />
                <Form.Control.Feedback type="invalid">
                  {stepTwoForm.errors.dataDeIda}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="mt-3">Data final</Form.Label>
                <Form.Control
                  name="dataDeVolta"
                  onChange={stepTwoForm.handleChange}
                  onBlur={stepTwoForm.handleBlur}
                  isValid={stepTwoForm.touched.dataDeVolta && !stepTwoForm.errors.dataDeVolta}
                  isInvalid={stepTwoForm.touched.dataDeVolta && stepTwoForm.errors.dataDeVolta}
                  min={stepTwoForm.values.dataDeIda}
                  max="2099-12-31"
                  type="date"
                  value={stepTwoForm.values.dataDeVolta}
                />
                <Form.Control.Feedback type="invalid">
                  {stepTwoForm.errors.dataDeVolta}
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
              <Form.Group className="mb-3">
                <Form.Label>Adicione uma descrição</Form.Label>
                <Form.Control
                  name="description"
                  onChange={stepThreeForm.handleChange}
                  onBlur={stepThreeForm.handleBlur}
                  isValid={
                    stepThreeForm.touched.description && !stepThreeForm.errors.description
                  }
                  isInvalid={
                    stepThreeForm.touched.description && stepThreeForm.errors.description
                  }
                  as="textarea"
                  rows={3}
                  value={stepThreeForm.values.description}
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
          {formStep === 3 && (
            <Form onSubmit={stepFourForm.handleSubmit}>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Adicione uma foto de capa</Form.Label>
                <FileBase name="photo" type="file" multiple={false} value={stepFourForm.values.photo} onDone={({ base64 }) => setPhoto(base64)} />
                <Form.Control.Feedback type="invalid">
                  {stepFourForm.errors.photo}
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

export default EditTravelButton;
