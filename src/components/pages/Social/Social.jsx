/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import TemplatePrivate from '../../templates/TemplatePrivate/TemplatePrivate';
import TravelCard from '../../Card/TravelCard';

import { getAllToSocial } from '../../../services/api';

const Social = ({ user }) => {
  const [travels, setTravels] = useState([]);
  const [travelsByUser, setTravelsByUser] = useState([]);
  const [teste, setTeste] = useState([]);
  const username = useParams();
  console.log(username);
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

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (!travels.length) {
      return undefined;
    }
    const groupTravelsByUser = travels.reduce((r, a) => {
      r[a.owner.name] = [...(r[a.owner.name] || []), a];
      return r;
    }, {});
    setTravelsByUser([groupTravelsByUser]);
  }, [travels]);
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (!travelsByUser.length) {
      return undefined;
    }
    const y = Object.entries(travelsByUser[0]);
    setTeste(y);
  }, [travelsByUser]);
  console.log(teste);
  const trying = (something) => {
    if (!something.length) {
      console.log('passou dentro do IF');
      return undefined;
    }

    return (
      something.map((whatever) => (
        <TravelCard props={whatever} />
      ))
    );
  };
  return (
    <TemplatePrivate user={user}>
      <h1>Hi</h1>
      {teste.map((x) => (
        <p>
          <div className="container">
            <div className="row d-flex justify-content-between">
              <div className="col-12 d-flex justify-content-between align-items-center">
                <Link to="/my-travels" className="home-link">
                  <div className="d-flex align-items-center">
                    <div className="user-picture" />
                    <div className="user-info">
                      <span className="name">{x[0]}</span>
                      <br />
                      {' '}
                      000 roteiros
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className="row">
            {trying(x[1].slice(0, 3))}
          </div>
        </p>
      ))}
    </TemplatePrivate>
  );
};

export default Social;
