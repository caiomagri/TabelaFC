import React from 'react';
import PropTypes from 'prop-types';

import LeagueItem from '../LeagueItem';

import { Container } from './styles';

export default function LeagueList({ data, navigation }) {
  return (
    <Container
      data={data}
      keyExtractor={item => String(item.idLeague)}
      renderItem={({ item }) => (
        <LeagueItem data={item} navigation={navigation} />
      )}
    />
  );
}

LeagueList.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};
