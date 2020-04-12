import React from 'react';
import PropTypes from 'prop-types';

import {
  Container,
  HomeTeam,
  AwayTeam,
  Info,
  Versus,
  DateTime,
} from './styles';

export default function Match({ data }) {
  return (
    <Container>
      <HomeTeam id={data.idHomeTeam} />
      <Info>
        <Versus>X</Versus>
        <DateTime>{data.strDate}</DateTime>
        <DateTime>{data.strTimeLocal}</DateTime>
      </Info>
      <AwayTeam id={data.idAwayTeam} />
    </Container>
  );
}

Match.propTypes = {
  data: PropTypes.shape({
    idHomeTeam: PropTypes.string.isRequired,
    strDate: PropTypes.string.isRequired,
    strTimeLocal: PropTypes.string.isRequired,
    idAwayTeam: PropTypes.string.isRequired,
  }).isRequired,
};
