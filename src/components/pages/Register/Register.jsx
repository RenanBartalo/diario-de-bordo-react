import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { Form, Col, Button } from 'react-bootstrap';

import TemplatePublic from '../../templates/TemplatePublic/TemplatePublic';

import { register, login } from '../../../services/api';

import './Register.css';

const registerSchema = yup.object().shape({
  name: yup.string().required('Campo obrigatório').min(3, 'Minimum of 3 characters').max(100, 'Maximum of 100 characters'),
  email: yup.string().required('Campo obrigatório').email('Must have email format'),
  password: yup.string().required('Campo obrigatório').max(150, 'Maximum of 150 characters'),
});

const Register = () => {
  const navigate = useNavigate();

  const {
    values, touched, errors, handleChange, handleBlur, handleSubmit, setErrors,
  } = useFormik({
    initialValues: { name: '', email: '', password: '' },
    validationSchema: registerSchema,
    onSubmit: async (formData) => {
      try {
        await register(formData);

        const tokenResponse = await login({ email: formData.email, password: formData.password });

        localStorage.setItem('token', tokenResponse.token);

        navigate('/my-travels');
      } catch (error) {
        setErrors({
          email: error.response.data.error,
        });
      }
    },
  });

  return (
    <TemplatePublic>
      <div className="container container-public">
        <div className="row h-100 px-3 d-flex justify-content-center align-items-center">
          <div className="col-md-6 p-4 register-container">
            <h2 className="mt-0 text-center">Bem-vindo ao diário de bordo</h2>
            <p className="text-center">Cadastre-se e comece a sua jornada</p>
            <hr />
            <Form onSubmit={handleSubmit}>
              <Form.Group as={Col} md="12" controlId="register-form" className="pt-3">
                <Form.Control
                  placeholder="Nome"
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.name && !errors.name}
                  isInvalid={touched.name && errors.name}
                />
                <Form.Control.Feedback>Ok!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="12" controlId="register-form" className="pt-3">
                <Form.Control
                  placeholder="E-mail"
                  type="text"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.email && !errors.email}
                  isInvalid={touched.email && errors.email}
                />
                <Form.Control.Feedback>Ok!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="12" controlId="register-form" className="pt-3">
                <Form.Control
                  placeholder="Senha"
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.password && !errors.password}
                  isInvalid={touched.password && errors.password}
                />
                <Form.Control.Feedback>Ok!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
              </Form.Group>

              <Button type="submit" size="lg" className="register-submit-button">Cadastrar</Button>
            </Form>
          </div>
        </div>
      </div>

    </TemplatePublic>
  );
};

export default Register;
