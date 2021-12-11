import React from 'react';
import { Link } from 'react-router-dom';
import './card.css';

const TravelCard = ({...props}) => {
  const {_id, photo, cidade, numDays, dataDeIda, dataDeVolta } = props.props
  console.log(cidade)
  return (
    <Link
      key={_id}
      to={`/my-travels/${_id}`}
      className="col-lg-4 col-md-6 mb-3"
      style={{
        textDecoration: 'none',
        color: '#FFFFFF',
      }}
    >
        <div
          className="travel-card d-flex align-items-end"
          style={{
            backgroundImage: `url(${photo})`,
          }}
        >
          <div className="card-content d-flex align-items-end">
            <div>
              <h5 className="title">{cidade}</h5>
              <p>
                {numDays}
                dias -
                {dataDeIda} a {dataDeVolta}
              </p>
            </div>
          </div>
        </div>
    </Link>
)}

export default TravelCard
