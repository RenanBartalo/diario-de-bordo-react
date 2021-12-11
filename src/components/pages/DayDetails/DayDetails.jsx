/* eslint-disable no-console */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import TemplatePrivate from '../../templates/TemplatePrivate/TemplatePrivate';

import { getOneDay } from '../../../services/api';
import './DayDetails.css';

const DayDetails = ({ user }) => {
  const [day, setDay] = useState([]);
  const { dayId } = useParams();
  const getDay = async () => {
    try {
      const token = localStorage.getItem('token');
      const dayFounded = await getOneDay(dayId, token);
      setDay(dayFounded);
      console.log(dayFounded);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDay();
  }, []);

  return (
    
    <TemplatePrivate user={user}>
      <section className="container-fluid details-container" style={{ backgroundImage: `url(${dayId})` }}>
        <div className="details-inner d-flex align-items-end">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h1>que dia</h1>
                <p>
                  De
                  {' '}

                  {' '}
                  a
                  {' '}

                </p>
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
