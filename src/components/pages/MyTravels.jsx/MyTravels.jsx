/* eslint-disable no-console */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';


import TemplatePrivate from '../../templates/TemplatePrivate/TemplatePrivate';
import Toast from '../../miscelaneous/Toast/Toast';
import ItinerariesHeader from '../../ItinerariesHeader/ItinerariesHeader';

import { getTravels } from '../../../services/api';
import TravelCard from '../../Card/TravelCard';



const MyTravels = ({ setUser, user }) => {
  const [show, setShow] = useState(false);
  const [projects, setProjects] = useState([]);
  const searchTitle = '';

  const getProjectsByTitle = async () => {
    try {
      const token = localStorage.getItem('token');
      const foundProjects = await getTravels(searchTitle, token);

      setProjects(foundProjects.travels);
      const userX = foundProjects.user.name;
      const roteirosX = foundProjects.travels.length;
      setUser({ ...user, name: userX, roteiros: roteirosX });
    } catch (error) {
      setShow(true);
    }
  };

  useEffect(() => {
    getProjectsByTitle();
  }, [searchTitle]);

  return (
    <TemplatePrivate user={user}>
      <ItinerariesHeader />
      <div className="container">
        <div className="row">
          {projects.map((travel) => (
            <TravelCard
              props = {travel}
            />
          ))}
        </div>
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

export default MyTravels;
