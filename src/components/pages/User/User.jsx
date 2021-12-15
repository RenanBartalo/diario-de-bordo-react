/* eslint-disable no-console */
import React, { useState } from 'react';
import FileBase from 'react-file-base64';
import { Form, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import TemplatePublic from '../../templates/TemplatePublic/TemplatePublic';

import { updateUser } from '../../../services/api';

import './User.css';

const User = () => {
  console.log(updateUser);
  const [photox, setPhoto] = useState('');
  const { userId } = useParams();
  console.log(userId);
  console.log(photox);

  const editUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const body = { photo: photox };
      await updateUser(userId, body, token);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  const handleSubmit = () => {
    console.log('chamou o submit');
    editUser();
  };

  const handleChange = (e) => {
    setPhoto(e);
  };

  return (
    <TemplatePublic>
      <div className="container container-public">
        <div className="row h-100 px-3 d-flex justify-content-center align-items-center">
          <div className="col-md-6 p-4 register-container">
            <h2 className="mt-0 text-center">Altere seus dados</h2>
            <hr />
            <Form onSubmit={handleSubmit}>
              <Form.Label>Adicione uma foto de perfil</Form.Label>
              <FileBase
                name="photo"
                type="file"
                multiple={false}
                onChange={(e) => handleChange(e.target.value)}
                onDone={({ base64 }) => setPhoto(base64)}
              />
              <Button
                type="submit"
                size="lg"
                className="register-submit-button"
              >
                Alterar
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </TemplatePublic>
  );
};

export default User;
