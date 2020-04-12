import React, { useState, useEffect, useContext } from 'react';
import { ActivityIndicator } from 'react-native';
import Axios from 'axios';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';

import api from '../../services/api';

import Background from '../../components/Background';
import InputSearch from '../../components/InputSearch';
import LeagueItem from '../../components/LeagueItem';

import { Container, LeagueList } from './styles';

export default function Leagues({ navigation }) {
  const { colors } = useContext(ThemeContext);
  const [leagues, setLeagues] = useState([]);
  const [filteredLeagues, setFilteredLeagues] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLeagues() {
      try {
        const url = 'search_all_leagues.php?s=Soccer';
        const response = await api.get(url);

        if (response.status === 200) {
          setLeagues(response.data.countrys);
          setFilteredLeagues(response.data.countrys);
        }
        setLoading(false);
      } catch (error) {
        if (Axios.isCancel(error)) {
          // cancelled
        } else {
          throw error;
        }
      }
    }
    loadLeagues();
  }, []);

  useEffect(() => {
    const filtered = leagues.filter(league =>
      league.strLeague.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredLeagues(filtered);
  }, [filter, leagues]);

  return (
    <Background>
      {loading ? null : (
        <InputSearch
          onChangeText={setFilter}
          value={filter}
          placeholder="Buscar por nome da liga ..."
        />
      )}
      <Container>
        {loading ? (
          <ActivityIndicator color={colors.text} size={30} />
        ) : (
          <>
            <LeagueList
              data={filteredLeagues}
              keyExtractor={item => String(item.idLeague)}
              renderItem={({ item }) => (
                <LeagueItem data={item} navigation={navigation} />
              )}
            />
          </>
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
