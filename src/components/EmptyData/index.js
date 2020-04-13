import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function EmptyData({ children }) {
  return <Container>{children}</Container>;
}

EmptyData.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
