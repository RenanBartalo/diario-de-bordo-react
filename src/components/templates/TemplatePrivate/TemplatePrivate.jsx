import React from 'react';
import PropTypes from 'prop-types';

import './TemplatePrivate.css';

const TemplatePrivate = ({ children }) => (
  <div>
    <div className="template-private-content">
      {children}
    </div>
  </div>
);

TemplatePrivate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TemplatePrivate;
