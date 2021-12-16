/* eslint-disable no-console */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

import { deleteOneTravel } from '../../services/api';

const DeleteTravelButton = (x) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const travelId = Object.values(x);
  console.log(x);
  const deleteOneTravelById = async () => {
    try {
      const token = localStorage.getItem('token');
      await deleteOneTravel(travelId[0], token);
      navigate(-1);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="ms-3">
      <Button variant="danger" onClick={handleShow}>
        Deletar
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Deletar o dia?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Essa ação é irreversível.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Voltar
          </Button>
          <Button variant="danger" onClick={deleteOneTravelById}>
            Deletar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DeleteTravelButton;
