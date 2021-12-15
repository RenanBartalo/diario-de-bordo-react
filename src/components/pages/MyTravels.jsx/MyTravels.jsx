/* eslint-disable no-console */
/* eslint-disable max-len */
import React from 'react';

import TemplatePrivate from '../../templates/TemplatePrivate/TemplatePrivate';
import ItinerariesHeader from '../../ItinerariesHeader/ItinerariesHeader';
import TravelCard from '../../Card/TravelCard';

const MyTravels = ({ projects, user }) => {
  return (
    <TemplatePrivate user={user}>
      <ItinerariesHeader />
      <div className="container">
        <div className="row">
          {projects.map((travel) => (
            <TravelCard
              props={travel}
            />
          ))}
        </div>
      </div>
    </TemplatePrivate>
  );
};

export default MyTravels;
