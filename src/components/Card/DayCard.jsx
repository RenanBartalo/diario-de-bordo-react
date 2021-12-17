import React from 'react';
import { Link } from 'react-router-dom';
import './card.css';

const DayCard = ({ ...props }) => {
  const {
    _id, dia, description, photos,
  } = props.dia;
  return (
    <Link
      key={_id}
      to={`/detail/${_id}`}
      className="col-lg-3 col-md-4 mb-3"
      style={{
        textDecoration: 'none',
        color: '#FFFFFF',
      }}
    >
      <div
        className="travel-card d-flex align-items-end"
        style={{
          backgroundImage: `url(${photos[0]})`,
        }}
      >
        <div className="travel-card d-flex align-items-end">
          <div className="card-content d-flex align-items-end">
            <div>
              <h5 className="title">
                dia -
                {' '}
                {dia}
              </h5>
              <p>{description}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DayCard;
