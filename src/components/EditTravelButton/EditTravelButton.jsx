import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

import { editOneTravel } from '../../services/api';

const EditTravelButton = (x) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const travelId = Object.values(x);
  const editOneTravelById = async () => {
    try {
      const token = localStorage.getItem('token');
      await editOneTravel(travelId[0], token);
      handleClose();
    } catch (err) {
      // eslint-disable-next-line no-console
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
          <Button variant="danger" onClick={editOneTravelById}>
            Deletar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditTravelButton;
