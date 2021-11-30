/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import NavBar from '../../NavBar/NavBar';

import ItinerariesHeader from '../../ItinerariesHeader/ItinerariesHeader';

import './TemplatePrivate.css';

const TemplatePrivate = ({ children, props }) => {
  console.log(props);

  const name = props[0] ? props[0] : 'nonexiste';
  const roteiros = props[1] ? props[1] : '000';

  return (
    <div>
      <NavBar name={name} roteiros={roteiros} />
      <ItinerariesHeader />
      <div className="template-private-content">
        { children }
      </div>
    </div>
  );
};

TemplatePrivate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TemplatePrivate;
