/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-console */
import React from 'react';
import { Link } from 'react-router-dom';

import './navbar.css';

const NavBar = (props) => {
  console.log(props);

  const userX = 'NoName';
  const roteiroX = '000';

  return (
    <nav className="py-3">
      <div className="container">
        <div className="row d-flex justify-content-between">
          <div className="col-12 d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <div className="user-picture" />
              <div className="user-info">
                <span className="name">{ userX }</span>
                <br />
                {' '}{ roteiroX }{' '}roteiros
              </div>
            </div>
            <div>
              <Link to="/" className="logout">logout</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
