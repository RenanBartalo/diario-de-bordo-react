/* eslint-disable no-console */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import { Form, Col } from 'react-bootstrap';

import TemplatePrivate from '../../templates/TemplatePrivate/TemplatePrivate';
import Toast from '../../miscelaneous/Toast/Toast';

import { getTravels } from '../../../services/api';

import './MyProjects.css';

const MyProjects = () => {
  const [show, setShow] = useState(false);
  const [projects, setProjects] = useState([]);
  const [searchTitle, setSearchTitle] = useState('');
  const [user, setUser] = useState([]);

  const getProjectsByTitle = async () => {
    try {
      const token = localStorage.getItem('token');
      const foundProjects = await getTravels(searchTitle, token); // Se der algum erro com status DIFERENTE de 401, vai cair no catch abaixo

      setProjects(foundProjects.travels);
      const userX = foundProjects.user.name;
      const roteiros = foundProjects.travels.length;
      setUser([userX, roteiros]);
    } catch (error) {
      setShow(true);
    }
  };

  const handleChange = async (e) => {
    setSearchTitle(e.target.value);
  };

  useEffect(() => {
    getProjectsByTitle();
  }, [searchTitle]);
  // Chama a callback quando o componente termina de montar pela primeira vez
  // OU quando a variavel searchTitle é atualizada

  return (
    <TemplatePrivate props={user}>
      <Form.Group as={Col} md="12" controlId="login-form">
        <Form.Control
          type="text"
          placeholder="Search by title"
          value={searchTitle}
          onChange={handleChange}
        />
      </Form.Group>
      <div className="projects-container">
        {projects.map((travel) => (
          <Link className="project-card" key={travel._id} to={`/my-travels/${travel._id}`}>
            <p>{travel.cidade}</p>
          </Link>
        ))}
      </div>

      <Toast
        variant="danger"
        message="An Error Has Occurred"
        show={show}
        setShow={setShow}
      />
    </TemplatePrivate>
  );
};

export default MyProjects;
