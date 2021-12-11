/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-console */
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import './navbar.css';

const NavBar = ({ ...props }) => {
  const theName = props.name;
  const theNumber = props.roteiros;

  return (
    <nav className="py-3">
      <div className="container">
        <div className="row d-flex justify-content-between">
          <div className="col-12 d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <div className="user-picture" />
              <div className="user-info">
                <span className="name">{ theName }</span>
                <br />
                {' '}{ theNumber }{' '}roteiros
              </div>
            </div>
            <div>
              <Link to="/" className="logout">
                <Button>
                  logout
                </Button>
              </Link>
              <Link to="/social" className="logout">
                <Button variant="outline-secondary ms-3">
                  Social
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
