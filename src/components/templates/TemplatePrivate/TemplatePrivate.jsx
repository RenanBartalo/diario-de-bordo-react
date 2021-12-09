/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import NavBar from '../../NavBar/NavBar';

import './TemplatePrivate.css';

const TemplatePrivate = ({ children, user }) => {
  return (
    <div>
      <NavBar name={user.name} roteiros={user.roteiros} />
      { children }
    </div>
  );
};

TemplatePrivate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TemplatePrivate;
