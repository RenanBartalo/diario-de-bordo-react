/* eslint-disable no-console */
import React from 'react';

import { Form, Col, Button } from 'react-bootstrap';

import TemplatePublic from '../../templates/TemplatePublic/TemplatePublic';

import { updateUser } from '../../../services/api';

import './User.css';

const User = () => {
  console.log(updateUser);

  const handleSubmit = () => {
    console.log('chamou o submit');
  };
  const handleChange = () => {
    console.log('chamou o change');
  };

  return (
    <TemplatePublic>
      <div className="container container-public">
        <div className="row h-100 px-3 d-flex justify-content-center align-items-center">
          <div className="col-md-6 p-4 register-container">
            <h2 className="mt-0 text-center">Altere seus dados</h2>
            <hr />
            <Form onSubmit={handleSubmit}>
              <Form.Group as={Col} md="12" controlId="register-form" className="pt-3">
                <Form.Control
                  placeholder="Nome"
                  type="text"
                  name="name"
                  value={(e) => console.log(e)}
                  onChange={handleChange}
                />
                <Form.Control.Feedback>Ok!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="12" controlId="register-form" className="pt-3">
                <Form.Control
                  placeholder="E-mail"
                  type="text"
                  name="email"
                  value={(e) => console.log(e)}
                  onChange={handleChange}
                />
                <Form.Control.Feedback>Ok!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="12" controlId="register-form" className="pt-3">
                <Form.Control
                  placeholder="foto"
                  type="photo"
                  name="photo"
                  value={(e) => console.log(e)}
                  onChange={handleChange}
                />
                <Form.Control.Feedback>Ok!</Form.Control.Feedback>
              </Form.Group>

              <Button type="submit" size="lg" className="register-submit-button">Cadastrar</Button>
            </Form>
          </div>
        </div>
      </div>

    </TemplatePublic>
  );
};

export default User;
