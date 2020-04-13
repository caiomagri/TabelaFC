import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Leagues from './pages/Leagues';
import Favorites from './pages/Favorites';

const Tabs = createBottomTabNavigator();

export default function createRouter() {
  const { colors } = useContext(ThemeContext);

  return (
    <>
      <Tabs.Navigator
        tabBarOptions={{
          activeTintColor: colors.activeTintColor,
          inactiveTintColor: colors.inactiveTintColor,
          inactiveBackgroundColor: colors.inactiveBackgroundColor,
          activeBackgroundColor: colors.activeBackgroundColor,
          style: {
            backgroundColor: colors.primary,
          },
          keyboardHidesTabBar: true,
        }}
      >
        <Tabs.Screen
          name="Leagues"
          component={Leagues}
          options={{
            unmountOnBlur: true,
            tabBarLabel: 'Ligas',
            tabBarIcon: () => (
              <Icon name="trophy" size={20} color={colors.secondary} />
            ),
          }}
        />

        <Tabs.Screen
          name="Favorites"
          component={Favorites}
          options={{
            unmountOnBlur: true,
            tabBarLabel: 'Favoritos',
            tabBarIcon: () => (
              <Icon name="star" size={20} color={colors.secondary} />
            ),
          }}
        />
      </Tabs.Navigator>
    </>
  );
}
