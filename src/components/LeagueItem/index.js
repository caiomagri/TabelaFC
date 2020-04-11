import React from 'react';
import PropTypes from 'prop-types';

import { Container, Logo, Title } from './styles';

export default function LeagueItem({ data, navigation }) {
  return (
    <Container
      onPress={() => navigation.navigate('LeagueDetail', { league: data })}
    >
      <Logo source={{ uri: data.strBadge }} />
      <Title>{data.strLeague}</Title>
    </Container>
  );
}

LeagueItem.propTypes = {
  data: PropTypes.shape({
    strBadge: PropTypes.string,
    strLeague: PropTypes.string,
  }).isRequired,
};
