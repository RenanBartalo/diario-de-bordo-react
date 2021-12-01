import { React, useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { Form, Button } from 'react-bootstrap';

import './new-trip-button.css';

const NewTripButton = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formStep, setFormStep] = useState(0);

  useEffect(() => {
    setTimeout(() => {setFormStep(0)}, 500)
  }, [show]);
  
  const newTripSchema = yup.object().shape({
    destination: yup.string().required('Campo obrigatório').min(3, 'Minimum of 3 characters').max(100, 'Maximum of 100 characters'),
    initialDate: yup.date().required('Campo obrigatório').min(3, 'Minimum of 3 characters').max(100, 'Maximum of 100 characters'),
    finalDate: yup.date().required('Campo obrigatório').min(3, 'Minimum of 3 characters').max(100, 'Maximum of 100 characters'),
    travelDecription: yup.string().required('Campo obrigatório').min(3, 'Minimum of 3 characters').max(100, 'Maximum of 100 characters'),
    coverPicture: yup.string().required('Campo obrigatório').min(3, 'Minimum of 3 characters').max(100, 'Maximum of 100 characters'),
  });

  const {
    values, touched, errors, handleChange, handleBlur, handleSubmit, setErrors,
  } = useFormik({
    initialValues: { destination: '', initialDate: '', finalDate: '', travelDecription: '', coverPicture: ''  },
    validationSchema: newTripSchema,
    onSubmit: async (formData) => {
      try {
        await register(formData);

        // const tokenResponse = await login({ email: formData.email, password: formData.password });

        localStorage.setItem('token', tokenResponse.token);

        handleClose();
      } catch (error) {
        setErrors({
          destination: error.response.data.error,
        });
      }
    },
  });

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
                name="destination"
                value={values.destination}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.destination && !errors.destination}
                isInvalid={touched.destination && errors.destination}
                type="text"
                placeholder="ex. Paris"
                />
                <Form.Control.Feedback type="invalid">{errors.destination}</Form.Control.Feedback>
              </Form.Group>
              <Button type="button" size="lg" onClick={() => setFormStep(formStep + 1)} className="register-submit-button">Próximo passo</Button>
            </section>)}
            {formStep === 1 && (
            <section>
              <Form.Group className="mb-3">
                <Form.Label>Data inicial</Form.Label>
                <Form.Control
                name="initialDate"
                value={values.initialDate}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.initialDate && !errors.initialDate}
                isInvalid={touched.initialDate && errors.initialDate}
                type="date"
                max="2099-12-31"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control.Feedback type="invalid">{errors.initialDate}</Form.Control.Feedback>
                <Form.Label className="mt-3">Data final</Form.Label>
                <Form.Control
                name="finalDate"
                value={values.finalDate}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.finalDate && !errors.finalDate}
                isInvalid={touched.finalDate && errors.finalDate}
                max="2099-12-31"
                type="date" />
                <Form.Control.Feedback type="invalid">{errors.finalDate}</Form.Control.Feedback>
              </Form.Group>
              <Button type="button" size="lg" onClick={() => setFormStep(formStep + 1)} className="register-submit-button">Próximo passo</Button>
            </section>)}
            {formStep === 2 && (
            <section>
              <Form.Group className="mb-3">
                <Form.Label>Adicione uma descrição</Form.Label>
                <Form.Control
                name="travelDecription"
                value={values.travelDecription}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.travelDecription && !errors.travelDecription}
                isInvalid={touched.travelDecription && errors.travelDecription}
                as="textarea"
                rows={3}
                />
                <Form.Control.Feedback type="invalid">{errors.travelDecription}</Form.Control.Feedback>
              </Form.Group>
              <Button type="button" size="lg" onClick={() => setFormStep(formStep + 1)} className="register-submit-button">Próximo passo</Button>
            </section>)}
            {formStep === 3 && (
            <section>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Adicione uma foto de capa</Form.Label>
                <Form.Control
                name="coverPicture"
                value={values.coverPicture}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.coverPicture && !errors.coverPicture}
                isInvalid={touched.coverPicture && errors.coverPicture}
                type="file"
                />
                <Form.Control.Feedback type="invalid">{errors.coverPicture}</Form.Control.Feedback>
              </Form.Group>
            </section>)}
            {formStep < 3
              ? undefined
              : <Button type="submit" size="lg" className="register-submit-button">Enviar</Button> }
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default NewTripButton;
