import React from 'react';
import PropTypes from 'prop-types';
import NavBar from '../../NavBar/NavBar';

import ItinerariesHeader from '../../ItinerariesHeader/ItinerariesHeader';

import './TemplatePrivate.css';

const TemplatePrivate = ({ children }) => (
  <div>
    <NavBar />
    <ItinerariesHeader />
    <div className="template-private-content">
      {children}
    </div>
  </div>
);

TemplatePrivate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TemplatePrivate;
