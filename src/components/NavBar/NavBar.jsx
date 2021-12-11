/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-console */
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Gear from '../../images/settings.png'

import './navbar.css';

const NavBar = ({ ...props }) => {
  const theName = props.name;
  const theNumber = props.roteiros;

  return (
    <div>
      <nav className="py-3">
        <div className="container">
          <div className="row d-flex justify-content-between">
            <div className="col-12 d-flex justify-content-between align-items-center">
              <Link to="/my-travels" className="home-link">
                <div className="d-flex align-items-center">
                  <div className="user-picture" />
                  <div className="user-info">
                    <span className="name">{ theName }</span>
                    <br />
                    {' '}{ theNumber }{' '}roteiros
                  </div>
                </div>
              </Link>
              <div>
                <Link to="/" className="logout">
                  <Button>
                    logout
                  </Button>
                </Link>
                <Link to="/social" className="hide">
                  <Button variant="outline-secondary ms-3">
                    Social
                  </Button>
                </Link>
                <img src={ Gear } alt="Settings Icon" className="gear hide" />
              </div>
            </div>
          </div>
        </div>
      </nav>
      <section id="footer" className="show">
        <Link to="/social">
          <Button variant="outline-secondary ms-3">
            Social
          </Button>
        </Link>
        <Link to="/social">
          <Button variant="outline-secondary ms-3">
            Ajustes
          </Button>
        </Link>
      </section>
    </div>
  );
};

export default NavBar;
