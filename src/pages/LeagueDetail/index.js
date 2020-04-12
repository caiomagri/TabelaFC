import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import { ScrollView, View, StyleSheet, ActivityIndicator } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import { ThemeContext } from 'styled-components';

import api from '../../services/api';

import { Container, Logo, Title, CalendarView, EmptyData } from './styles';

import Background from '../../components/Background';

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

  return (
    <Background>
      <Container>
        {!loading ? (
          <CalendarView>
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
          </CalendarView>
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
