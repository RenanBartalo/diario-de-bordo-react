/* eslint-disable no-console */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';

import TemplatePrivate from '../../templates/TemplatePrivate/TemplatePrivate';

import { getAllToSocial } from '../../../services/api';

const Social = ({ user }) => {
  const [travels, setTravels] = useState([]);

  const getAll = async () => {
    try {
      const token = localStorage.getItem('token');
      const foundTravels = getAllToSocial(token);
      console.log(foundTravels);
      setTravels({ ...foundTravels });
      console.log(travels);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <TemplatePrivate user={user}>
      <div>Hello</div>
    </TemplatePrivate>
  );
};

export default Social;
