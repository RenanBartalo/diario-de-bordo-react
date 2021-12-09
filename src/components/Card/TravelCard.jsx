import React from 'react';
import { Link } from 'react-router-dom';
import './card.css';
const TravelCard = ({props}) => {
  console.log(props)
  return (
    <Link
      key={props._id}
      to={`/my-travels/${props._id}`}
      className="col-lg-4 col-md-6 mb-3"
      style={{
        textDecoration: 'none',
        color: '#FFFFFF',
      }}
    >
        <div
          className="travel-card d-flex align-items-end"
          style={{
            backgroundImage: `url(${props.photo})`,
          }}
        >
          <div className="card-content d-flex align-items-end">
            <div>
              <h5 className="title">{props.cidade}</h5>
              <p>
                {props.numDays}
                dias -
                {props.dataDeIda} a {props.dataDeVolta}
              </p>
            </div>
          </div>
        </div>
    </Link>
)}

export default TravelCard
