import React from 'react';
import { Link } from 'react-router-dom';
import './card.css';

const DayCard = ({...props}) => {
  return (
    <Link
      key={props._id}
      to={`/my-travels/`}
      className="col-lg-3 col-md-4 mb-3"
      style={{
        textDecoration: 'none',
        color: '#FFFFFF',
      }}
    >
        <div
          className="travel-card d-flex align-items-end"
        //   style={{
        //     backgroundImage: `url(${photo})`,
        //   }}
        >
          <div className="card-content d-flex align-items-end">
            <div>
              <h5 className="title">{props.day}</h5>
              <p>
                {props.description}
              </p>
            </div>
          </div>
        </div>
    </Link>
)}

export default DayCard
