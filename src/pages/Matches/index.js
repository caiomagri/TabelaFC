import React, { useState, useEffect, useContext } from 'react';
import { ActivityIndicator } from 'react-native';
import { ThemeContext } from 'styled-components';
import PropTypes from 'prop-types';

import api from '../../services/api';

import Background from '../../components/Background';
import Match from '../../components/Match';
import EmptyData from '../../components/EmptyData';

import { Container, MatchesList } from './styles';

export default function Matches({ route }) {
  const { colors } = useContext(ThemeContext);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const { league } = route.params;

  useEffect(() => {
    let mounted = true;
    async function loadMatches() {
      const url = `eventsnextleague.php?id=${league.idLeague}`;
      const response = await api.get(url);
      setLoading(false);

      if (response.status === 200) {
        if (!mounted) return;
        setMatches(response.data.events);
      }
    }
    loadMatches();
    return () => {
      // Runs when component will unmount
      mounted = false;
    };
  }, [league.idLeague]);
  return (
    <Background>
      <Container>
        {loading ? (
          <ActivityIndicator color={colors.text} size={30} />
        ) : (
          <>
            {matches && matches.length > 0 ? (
              <MatchesList
                data={matches}
                keyExtractor={item => String(item.idEvent)}
                renderItem={({ item }) => <Match data={item} />}
              />
            ) : (
              <EmptyData>
                Não encontrados nenhuma partida agendada para essa liga :(
              </EmptyData>
            )}
          </>
        )}
      </Container>
    </Background>
  );
}

Matches.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      league: PropTypes.shape({
        idLeague: PropTypes.string.isRequired,
        strBadge: PropTypes.string.isRequired,
        strLeague: PropTypes.string.isRequired,
        strCurrentSeason: PropTypes.string.isRequired,
      }),
    }),
  }).isRequired,
};
