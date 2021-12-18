/* eslint-disable no-console */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EditDayButton from '../../EditDayButton/EditDayButton';
import DeleteDayButton from '../../DeleteDayButton/DeleteDayButton';
import TemplatePrivate from '../../templates/TemplatePrivate/TemplatePrivate';

import { getOneDay, getOneTravel } from '../../../services/api';
import './DayDetails.css';

const DayDetails = ({ user, getProjectsByTitle }) => {
  const [day, setDay] = useState([]);
  const [travel, setTravel] = useState([]);
  const [photoX, setPhoto] = useState('');
  const { dayId } = useParams();
  const [myUser, setMyUser] = useState(false);

  const getDay = async () => {
    try {
      const token = localStorage.getItem('token');
      const dayFounded = await getOneDay(dayId, token);
      setDay(dayFounded);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDay();
  }, []);
  const pegarUmaViagemPeloId = async () => {
    try {
      const token = localStorage.getItem('token');
      const travelId = day.travel;
      const foundTravel = await getOneTravel(travelId, token);
      setTravel(foundTravel);
      setPhoto(day.photos[0] ? day.photos[0] : 'https://rotasdeviagem.com.br/wp-content/uploads/2019/06/praia-dos-artistas-natal-rn.jpg');
      setMyUser(foundTravel.owner === user.userId);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    pegarUmaViagemPeloId();
    getProjectsByTitle();
  }, [day]);
  const showEdit = (trueOrFalse) => {
    if (!trueOrFalse) {
      return undefined;
    }
    return (
      <div className="row">
        <div className="col-md-6 d-flex">
          <EditDayButton day={day} travel={travel} />
          <DeleteDayButton x={dayId} className="ms-3" />
        </div>
      </div>
    );
  };
  return (
    <TemplatePrivate user={user}>
      <section
        className="container-fluid details-container"
        style={{ backgroundImage: `url(${photoX})`, backgroundSize: 'cover' }}
      >
        <div className="details-inner d-flex align-items-end">
          <div className="container">
            <div className="row d-flex aling-middle">
              <div className="col-md-6">
                <h1>{travel.cidade}</h1>
                <p>
                  De
                  {' '}
                  {travel.dataDeIda}
                  {' '}
                  a
                  {' '}
                  {travel.dataDeVolta}
                </p>
              </div>
              <div className="col-md-6 align-self-center">
                <div className="buttons-container">{showEdit(myUser)}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="container">
        <div className="row">
          <div className="col-12 py-4">
            <h2>Detalhes do dia:</h2>
            <p>{day.dia}</p>
            <p>{day.description}</p>
          </div>
        </div>
      </section>
    </TemplatePrivate>
  );
};

export default DayDetails;
