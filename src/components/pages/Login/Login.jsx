import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { Form, Col, Button } from 'react-bootstrap';

import TemplatePublic from '../../templates/TemplatePublic/TemplatePublic';

import { login } from '../../../services/api';

import './Login.css';

const loginSchema = yup.object().shape({
  email: yup.string().required('Campo obrigatório').email('Must have email format'),
  password: yup.string().required('Campo obrigatório').max(150, 'Maximum of 150 characters'),
});

const Login = ({ loginUser }) => {
  const navigate = useNavigate();

  const {
    values, touched, errors, handleChange, handleBlur, handleSubmit, setErrors,
  } = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: loginSchema,
    onSubmit: async (formData) => {
      try {
        const tokenResponse = await login(formData);

        localStorage.setItem('token', tokenResponse.token);

        loginUser(); // Atualizar o isUserLogged do APP para TRUE

        navigate('/my-travels');
      } catch (error) {
        setErrors({
          email: error.response.data.error,
          password: error.response.data.error,
        });
      }
    },
  });

  return (
    <TemplatePublic>
      <div className="container container-public">
        <div className="row h-100 d-flex justify-content-center align-items-center">
          <div className="col-6 p-4 login-container">
            <h2 className="mt-0 text-center">Bem-vindo ao diário de bordo</h2>
            <p className="text-center">Compartilhe seus roteiros com outros viajantes</p>
            <hr />
            <Form onSubmit={handleSubmit}>
              <Form.Group as={Col} md="12" controlId="login-form" className="pt-3">
                <Form.Control
                  placeholder="Email"
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
              <Form.Group as={Col} md="12" controlId="login-form" className="pt-3">
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
              <Form.Group as={Col} md="12" controlId="login-form">
                <Form.Control.Feedback>Ok!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
              </Form.Group>
              <Button type="submit" size="lg" className="login-submit-button">Login</Button>
            </Form>
            <p className="text-center mt-3 mb-0">
              Ainda não tem uma conta?
              <Link to="/register"> Cadastre-se</Link>
            </p>
          </div>
        </div>
      </div>
    </TemplatePublic>
  );
};

export default Login;
