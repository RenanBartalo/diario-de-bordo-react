/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import NavBar from '../../NavBar/NavBar';

import ItinerariesHeader from '../../ItinerariesHeader/ItinerariesHeader';

import './TemplatePrivate.css';

const TemplatePrivate = ({ children, user }) => {
  console.log(user);

  return (
    <div>
      <NavBar name="{user.name}" roteiros="{user.roteiros}" />
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
