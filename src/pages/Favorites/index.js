import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';
import { ActivityIndicator } from 'react-native';
import { ThemeContext } from 'styled-components';

import Background from '../../components/Background';
import LeagueList from '../../components/LeagueList';
import EmptyData from '../../components/EmptyData';

import { Container } from './styles';

export default function Favorites({ navigation }) {
  const { colors } = useContext(ThemeContext);
  const [favoritesLeagues, setFavoritesLeagues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFavoriteLeagues() {
      try {
        setLoading(true);
        const leagues = JSON.parse(await AsyncStorage.getItem('favorite'));
        setLoading(false);

        if (leagues !== null) {
          setFavoritesLeagues(leagues);
        }
        setLoading(false);
      } catch (error) {
        // throw error;
      }
    }
    loadFavoriteLeagues();
  }, []);

  return (
    <Background>
      <Container>
        {loading ? (
          <ActivityIndicator color={colors.text} size={30} />
        ) : (
          <>
            {favoritesLeagues.length > 0 ? (
              <LeagueList data={favoritesLeagues} navigation={navigation} />
            ) : (
              <EmptyData>
                Você não possui nenhuma liga marcada como favorita!
              </EmptyData>
            )}
          </>
        )}
      </Container>
    </Background>
  );
}

Favorites.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
