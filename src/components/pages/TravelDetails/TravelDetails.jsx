/* eslint-disable no-console */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';

import {
  Button, Modal, Form, Col,
} from 'react-bootstrap';

import TemplatePrivate from '../../templates/TemplatePrivate/TemplatePrivate';

import { getOneTravel, createOneDay } from '../../../services/api';
import './TravelDetails.css';

const schema = yup.object().shape({
  dia: yup.number().required('Required field').max(3, 'Minimum of 3 characters'),
  description: yup.string().required('Required field').min(15, 'Minimum of 15 characters').max(150, 'Minimum of 150 characters'),
});

const TravelDetails = ({ user }) => {
  const { travelId } = useParams();

  const [travel, setTravel] = useState({});
  const [show, setShow] = useState(false);

  const pegarUmaViagemPeloId = async () => {
    try {
      const token = localStorage.getItem('token');
      const foundTravel = await getOneTravel(travelId, token);
      setTravel(foundTravel);
    } catch (error) {
      console.log(error);
    }
  };

  const fechaModal = () => {
    setShow(false);
    // eslint-disable-next-line no-use-before-define
    handleLimpaTudo();
  };
  const abreModal = () => setShow(true);

  useEffect(() => {
    pegarUmaViagemPeloId();
  }, []);

  const {
    values, errors, touched, handleChange, handleBlur, handleSubmit, setTouched, setValues,
  } = useFormik({
    initialValues: { dia: '', description: '' },
    validationSchema: schema,
    onSubmit: async (formData) => {
      try {
        console.log(formData);
        const token = localStorage.getItem('token');
        await createOneDay(travelId, formData, token);

        await pegarUmaViagemPeloId();

        fechaModal();
      } catch (error) {
        console.log(error);
      }
    },
  });

  function handleLimpaTudo() {
    setValues({ dia: '', description: '' });
    setTouched({ dia: false, description: false });
  }

  return (
    <TemplatePrivate user={user}>
      <h1>{travel.title}</h1>
      <p>{travel.description}</p>
      <img src={travel.photo} alt="testing" />
      <div>
        dias -
      </div>

      <div className="tasks-container">
        <div>
          <h2>Days:</h2>

          <ul>
            {travel.days && travel.days.map((day) => (
              <li>
                <h4>{day.title}</h4>
                <p>{day.description}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <Button onClick={abreModal}>Create new Day</Button>
        </div>
      </div>

      <Modal show={show} onHide={fechaModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Day</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group as={Col} md="12" controlId="create-task-form">
              <Form.Label>Dia</Form.Label>
              <Form.Control
                type="number"
                name="dia"
                value={values.dia}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.dia && !errors.dia}
                isInvalid={touched.dia && errors.dia}
              />
              <Form.Control.Feedback>Ok!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">{errors.dia}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="12" controlId="create-task-form">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.description && !errors.description}
                isInvalid={touched.description && errors.description}
              />
              <Form.Control.Feedback>Ok!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={fechaModal}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Create
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </TemplatePrivate>
  );
};

export default TravelDetails;
