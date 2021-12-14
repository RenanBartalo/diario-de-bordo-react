/* eslint-disable no-console */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EditDayButton from '../../EditDayButton/EditDayButton';
import DeleteDayButton from '../../DeleteDayButton/DeleteDayButton';
import TemplatePrivate from '../../templates/TemplatePrivate/TemplatePrivate';

import { getOneDay, getOneTravel } from '../../../services/api';
import './DayDetails.css';

const DayDetails = ({ user }) => {
  const [day, setDay] = useState([]);
  const [travel, setTravel] = useState([]);
  const { dayId } = useParams();
  const getDay = async () => {
    try {
      const token = localStorage.getItem('token');
      const dayFounded = await getOneDay(dayId, token);
      setDay(dayFounded);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(dayId);
  useEffect(() => {
    getDay();
  }, []);

  const pegarUmaViagemPeloId = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log(day.travel);
      const travelId = day.travel;
      const foundTravel = await getOneTravel(travelId, token);
      setTravel(foundTravel);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    pegarUmaViagemPeloId();
  }, [day]);
  console.log(travel);
  return (
    <TemplatePrivate user={user}>
      <section className="container-fluid details-container" style={{ backgroundImage: `url(${dayId})` }}>
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
                <div className="buttons-container">
                  <EditDayButton />
                  <DeleteDayButton
                    x={dayId}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="container">
        <div className="row">
          <div className="col-12 py-4">
            <h2>Detalhes da viagem</h2>
            <p>{day.description}</p>
          </div>
        </div>
      </section>
    </TemplatePrivate>
  );
};

export default DayDetails;
