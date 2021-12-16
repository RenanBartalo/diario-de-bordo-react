/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-console */
import React from 'react';
import bootstrap from 'bootstrap';
import { Link } from 'react-router-dom';
import './navbar.css';

const NavBar = ({ ...props }) => {
  const theName = props.name;
  const theNumber = props.roteiros;
  const thePhoto = props.photo;

  return (
    <div className="nav-bg">
      <nav className="py-3 hide">
        <div className="container">
          <div className="row d-flex justify-content-between">
            <div className="col-12 d-flex justify-content-between align-items-center">
              <Link to="/my-travels" className="home-link">
                <div className="d-flex align-items-center">
                  <div
                    className="user-picture"
                    style={{
                      backgroundImage: `url(${thePhoto})`,
                    }}
                  />
                  <div className="user-info">
                    <span className="name">{theName}</span>
                    <br /> {theNumber} roteiros
                  </div>
                </div>
              </Link>
              <div>
                <Link to="/" className="logout">
                  Logout
                </Link>
                <Link to="/social" className="social">
                  Social
                </Link>
                <Link to="/social" className="social">
                  Ajustes
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <nav className="navbar navbar-expand-lg navbar-light bg-light show">
        <div className="container-fluid">
          <Link to="/my-travels" className="home-link">
            <div className="d-flex align-items-center">
              <div
                className="user-picture"
                style={{
                  backgroundImage: `url(${thePhoto})`,
                }}
              />
              <div className="user-info">
                <span className="name">{theName}</span>
                <br /> {theNumber} roteiros
              </div>
            </div>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item my-2">
                <Link to="/" className="logout">
                  Logout
                </Link>
              </li>
              <li className="nav-item my-2">
                <Link to="/social" className="social">
                  Social
                </Link>
              </li>
              <li className="nav-item my-2">
                <Link to="/social" className="social">
                  Ajustes
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
