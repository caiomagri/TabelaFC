import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import { ScrollView, View, StyleSheet, ActivityIndicator } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import { ThemeContext } from 'styled-components';

import api from '../../services/api';

import { Container, Logo, Title, ButtonView, Button } from './styles';

import Background from '../../components/Background';
import EmptyData from '../../components/EmptyData';

export default function LeagueDetail({ route, navigation }) {
  const { colors } = useContext(ThemeContext);
  const [loading, setLoading] = useState(true);
  const [tableHead] = useState([
    '#',
    'Time',
    'P',
    'J',
    'V',
    'E',
    'D',
    'GP',
    'GC',
    'SG',
  ]);
  const [widthArray] = useState([40, 200, 40, 40, 40, 40, 40, 40, 40, 40]);
  const [tableData, setTableData] = useState([]);
  const { league } = route.params;
  const [favoritesLeagues, setFavoritesLeagues] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [starCheck, setStarCheck] = useState(null);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      paddingTop: 30,
    },
    header: { height: 50, backgroundColor: colors.background },
    headerText: { fontWeight: '100', color: colors.text, textAlign: 'center' },
    text: { fontWeight: '100', textAlign: 'center', color: colors.text },
    row: { height: 40, backgroundColor: colors.background },
  });

  useEffect(() => {
    let mounted = true;
    async function loadFavorites() {
      const favorites = await JSON.parse(
        await AsyncStorage.getItem('favorite')
      );
      if (favorites !== null) {
        const checkFavorite = favorites.filter(fav => {
          return fav.idLeague === league.idLeague;
        });

        if (!mounted) return;
        setIsFavorite(checkFavorite.length > 0);
        setFavoritesLeagues(favorites);
      }
    }
    loadFavorites();
    return () => {
      // Runs when component will unmount
      mounted = false;
    };
  }, [league.idLeague, starCheck]);

  useEffect(() => {
    let mounted = true;

    async function loadTable() {
      try {
        const url = `lookuptable.php?l=${league.idLeague}&s=${league.strCurrentSeason}`;
        const response = await api.get(url);
        setLoading(false);

        if (response.status === 200) {
          const { table } = response.data;
          const tableDataAux = [];
          if (table) {
            for (let i = 0; i < table.length; i += 1) {
              tableDataAux.push([
                i + 1,
                table[i].name,
                table[i].total,
                table[i].played,
                table[i].win,
                table[i].draw,
                table[i].loss,
                table[i].goalsfor,
                table[i].goalsagainst,
                table[i].goalsdifference,
              ]);
            }
          }
          if (!mounted) return;
          setTableData(tableDataAux);
        }
      } catch (error) {
        if (Axios.isCancel(error)) {
          // cancelled
        } else {
          throw error;
        }
      }
    }
    loadTable();
    return () => {
      // Runs when component will unmount
      mounted = false;
    };
  }, [league]);

  async function handleAddFavorite() {
    const data = {
      idLeague: league.idLeague,
      strLeague: league.strLeague,
      strBadge: league.strBadge,
      strCurrentSeason: league.strCurrentSeason,
    };
    setFavoritesLeagues([...favoritesLeagues, data]);
    await AsyncStorage.setItem(
      'favorite',
      JSON.stringify([...favoritesLeagues, data])
    );
    setStarCheck(true);
  }

  async function handleRemoveFavorite() {
    const index = favoritesLeagues.findIndex(
      fav => fav.idLeague === league.idLeague
    );
    if (index >= 0) {
      const newFavorites = [...favoritesLeagues];
      newFavorites.splice(index, 1);
      await AsyncStorage.setItem('favorite', JSON.stringify(newFavorites));
      setFavoritesLeagues(newFavorites);
      setStarCheck(false);
    }
  }

  return (
    <Background>
      <Container>
        {!loading ? (
          <ButtonView>
            <Button>
              <Icon
                name="star"
                size={20}
                color={isFavorite ? '#daa520' : colors.text}
                onPress={
                  isFavorite
                    ? () => handleRemoveFavorite()
                    : () => handleAddFavorite()
                }
              />
            </Button>
            <Button>
              <Icon
                name="calendar"
                size={20}
                color={colors.text}
                onPress={() =>
                  navigation.navigate('Matches', {
                    league,
                  })
                }
              />
            </Button>
          </ButtonView>
        ) : null}
        <Logo source={{ uri: league.strBadge }} />
        <Title>{league.strLeague}</Title>
        {loading ? (
          <ActivityIndicator color={colors.text} size={30} />
        ) : (
          <>
            {tableData.length > 0 ? (
              <ScrollView horizontal>
                <View>
                  <Table>
                    <Row
                      data={tableHead}
                      widthArr={widthArray}
                      style={styles.header}
                      textStyle={styles.headerText}
                    />
                  </Table>
                  <ScrollView>
                    <Table />
                    {tableData.map((rowData, index) => (
                      <Row
                        key={String(index)}
                        data={rowData}
                        widthArr={widthArray}
                        style={[
                          styles.row,
                          index % 2 && { backgroundColor: colors.background },
                        ]}
                        textStyle={styles.text}
                      />
                    ))}
                  </ScrollView>
                </View>
              </ScrollView>
            ) : (
              <EmptyData>
                Não foram encontradas informações recentes sobre este
                campeonato.
              </EmptyData>
            )}
          </>
        )}
      </Container>
    </Background>
  );
}

LeagueDetail.propTypes = {
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
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
