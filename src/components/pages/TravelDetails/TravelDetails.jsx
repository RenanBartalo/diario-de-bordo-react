/* eslint-disable no-console */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import TemplatePrivate from '../../templates/TemplatePrivate/TemplatePrivate';
import DayCard from '../../Card/DayCard';
import EditDayButton from '../../EditDayButton/EditDayButton';
import DeleteDayButton from '../../DeleteDayButton/DeleteDayButton';

import { getOneTravel } from '../../../services/api';
import './TravelDetails.css';

const TravelDetails = ({ user }) => {
  const { travelId } = useParams();

  const [travel, setTravel] = useState({});

  const pegarUmaViagemPeloId = async () => {
    try {
      const token = localStorage.getItem('token');
      const foundTravel = await getOneTravel(travelId, token);
      setTravel(foundTravel);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    pegarUmaViagemPeloId();
  }, []);

  return (
    <TemplatePrivate user={user}>
      <section className="container-fluid details-container" style={{ backgroundImage: `url(${travel.photo})` }}>
        <div className="details-inner d-flex align-items-end">
          <div className="container">
            <div className="row">
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
                  <DeleteDayButton className="mx-3" />
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
            <p>{travel.description}</p>
          </div>
        </div>
        <div className="row">
          {travel.days && travel.days.map((day) => (
            <DayCard
              dia={day}
            />
          ))}
        </div>
      </section>
    </TemplatePrivate>
  );
};

export default TravelDetails;
