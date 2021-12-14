/* eslint-disable no-console */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TemplatePrivate from '../../templates/TemplatePrivate/TemplatePrivate';
import TravelCard from '../../Card/TravelCard';

import { getAllToSocial } from '../../../services/api';

const Social = ({ user }) => {
  const [travels, setTravels] = useState([]);
  const [travelsByUser, setTravelsByUser] = useState([]);
  const [teste, setTeste] = useState([]);

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
  useEffect(() => {
    const y = Object.entries(travelsByUser);
    setTeste(y);
  }, [travelsByUser]);
  console.log(teste);
  return (
    <TemplatePrivate user={user}>
      <h1>Hi</h1>
{/*       <p>
        <div className="container">
          <div className="row d-flex justify-content-between">
            <div className="col-12 d-flex justify-content-between align-items-center">
              <Link to="/my-travels" className="home-link">
                <div className="d-flex align-items-center">
                  <div className="user-picture" />
                  <div className="user-info">
                    <span className="name">{teste[0][0]}</span>
                    <br /> 000 roteiros
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="row">
          {teste[0][1].slice(0, 3).map((x) => (
            <TravelCard props={x} />
          ))}
        </div>
      </p>
      <p>
        <div className="container">
          <div className="row d-flex justify-content-between">
            <div className="col-12 d-flex justify-content-between align-items-center">
              <Link to="/my-travels" className="home-link">
                <div className="d-flex align-items-center">
                  <div className="user-picture" />
                  <div className="user-info">
                    <span className="name">{teste[1][0]}</span>
                    <br /> 000 roteiros
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="row">
          {teste[1][1].slice(0, 3).map((x) => (
            <TravelCard props={x} />
          ))}
        </div>
      </p>  */}
    </TemplatePrivate>
  );
};

export default Social;
