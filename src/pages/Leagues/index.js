import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';

import api from '../../services/api';

import Background from '../../components/Background';
import InputSearch from '../../components/InputSearch';
import LeagueItem from '../../components/LeagueItem';

import { Container, LeagueList } from './styles';

export default function Leagues({ navigation }) {
  const [leagues, setLeagues] = useState([]);
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLeagues() {
      setLoading(true);
      const url = 'search_all_leagues.php?s=Soccer';
      const response = await api.get(
        country.length > 0 ? `${url}&c=${country}` : url
      );

      if (response.status === 200) {
        setLeagues(response.data.countrys);
      }
      setLoading(false);
    }
    loadLeagues();
  }, [country]);

  return (
    <Background>
      <Container>
        <InputSearch onChangeText={setCountry} value={country} />
        {loading ? (
          <ActivityIndicator color="#fff" size={30} />
        ) : (
          <LeagueList
            data={leagues}
            keyExtractor={(item) => String(item.idLeague)}
            renderItem={({ item }) => (
              <LeagueItem data={item} navigation={navigation} />
            )}
          />
        )}
      </Container>
    </Background>
  );
}

Leagues.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
