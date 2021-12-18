import React from 'react';
import NewTripButton from '../NewTripButton/NewTripButton';

import './itineraries-header.css';

const ItinerariesHeader = ({ setUpdate, update }) => {
  return (
    <div className="container py-3">
      <div className="row d-flex justify-content-between">
        <div className="col-12 d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <span className="my-trips">Meus roteiros</span>
          </div>
          <div>
            <NewTripButton setUpdate={setUpdate} update={update} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItinerariesHeader;
