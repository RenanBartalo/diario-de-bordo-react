import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

import { deleteOneDay } from '../../services/api';

const DeleteDayButton = (x) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dayId = Object.values(x);
  const deleteOneDayById = async () => {
    try {
      const token = localStorage.getItem('token');
      await deleteOneDay(dayId[0], token);
      navigate('/my-travels');
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
          <Button variant="danger" onClick={deleteOneDayById}>
            Deletar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DeleteDayButton;
