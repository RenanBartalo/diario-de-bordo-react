/* eslint-disable no-console */
import React, { useState } from 'react';
import FileBase from 'react-file-base64';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import TemplatePrivate from '../../templates/TemplatePrivate/TemplatePrivate';

import { updateUser } from '../../../services/api';

import './User.css';

const User = ({ user, getProjectsByTitle }) => {
  const [photoX, setPhoto] = useState(user.photo);
  const navigate = useNavigate();
  const { userId } = useParams();
  const updateSchema = yup.object().shape({
    name: yup.string().required('Campo obrigatório').min(3, 'Minimum of 3 characters').max(100, 'Maximum of 100 characters'),
    email: yup.string().required('Campo obrigatório').email('Must have email format'),
    photo: yup.string(),
  });
  getProjectsByTitle();
  const {
    values, touched, errors, handleChange, handleBlur, handleSubmit, setErrors,
  } = useFormik({
    enableReinitialize: true,
    initialValues: { name: user.name, email: user.email, photo: photoX },
    validationSchema: updateSchema,
    onSubmit: async (formData) => {
      try {
        const token = localStorage.getItem('token');
        await updateUser(userId, formData, token);
        navigate('/my-travels');
      } catch (error) {
        setErrors({
          email: error.response.data.error,
        });
      }
    },
  });
  return (
    <TemplatePrivate user={user}>
      <div className="container">
        <div className="row mt-3">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="register-form">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                onChange={handleChange}
                value={values.name}
                name="name"
                type="text"
                placeholder="Nome"
                onBlur={handleBlur}
                isValid={touched.name && !errors.name}
                isInvalid={touched.name && errors.name}
              />
              <Form.Control.Feedback>Ok!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="register-form">
              <Form.Label>Email</Form.Label>
              <Form.Control
                onChange={handleChange}
                value={values.email}
                name="email"
                type="email"
                placeholder="Enter email"
                onBlur={handleBlur}
                isValid={touched.email && !errors.email}
                isInvalid={touched.email && errors.email}
              />
              <Form.Control.Feedback>Ok!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" name="photo" controlId="register-form">
              <div className="col-12"><Form.Label>Adicione uma foto de perfil</Form.Label></div>
              <FileBase
                name="photo"
                type="file"
                value={values.photo}
                multiple={false}
                onDone={({ base64 }) => setPhoto(base64)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Alterar
            </Button>
          </Form>
        </div>
      </div>
    </TemplatePrivate>
  );
};

export default User;
