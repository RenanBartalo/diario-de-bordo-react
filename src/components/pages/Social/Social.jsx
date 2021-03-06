/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import TemplatePrivate from '../../templates/TemplatePrivate/TemplatePrivate';
import TravelCard from '../../Card/TravelCard';

import { getAllToSocial } from '../../../services/api';

const Social = ({ user, getProjectsByTitle }) => {
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
    getProjectsByTitle();
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
  const trying = (something) => {
    if (!something.length) {
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
      <div className="pt-3">
        {teste.map((x) => (
          <p>
            <div className="container">
              <div className="row d-flex justify-content-between">
                <div className="col-12 py-3 d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <div
                      className="user-picture"
                      style={{
                        backgroundImage: `url(${x[1][0].owner.photo})`,
                      }}
                    />
                    <div className="user-info">
                      <span className="name">{x[0]}</span>
                      <br />
                      {' '}
                      {x[1].length}
                      {' '}
                      roteiros
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                {trying(x[1].reverse().slice(0, 3))}
              </div>
            </div>
          </p>
        ))}
      </div>
    </TemplatePrivate>
  );
};

export default Social;
