/* eslint-disable no-console */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';

import TemplatePrivate from '../../templates/TemplatePrivate/TemplatePrivate';

import { getAllToSocial } from '../../../services/api';

const Social = ({ user }) => {
  const [travels, setTravels] = useState([]);
  const [travelsByUser, setTravelsByUser] = useState([]);

  const getAll = async () => {
    try {
      const token = localStorage.getItem('token');
      const foundTravels = await getAllToSocial(token);
      setTravels(foundTravels);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAll();
  }, []);

  useEffect(() => {
    const groupTravelsByUser = travels.reduce((r, a) => {
      r[a.owner.name] = [...(r[a.owner.name] || []), a];
      return r;
    }, {});
    setTravelsByUser([groupTravelsByUser]);
  }, [travels]);
   const y = Object.entries(travelsByUser[0]);
  console.log(y[0]); 
  return (
    <TemplatePrivate user={user}>
      <h1>Hi</h1>
      <p>
       {y[0][0]}
      {y[0][1].map((x) => (
        x.cidade
          ))}
      </p>
      <p>
      {y[1][0]} 
      {y[1][1].map((x) => (
        <DayCard
              dia={x}
            />
      </p>
    </TemplatePrivate>
  );
};

export default Social;
