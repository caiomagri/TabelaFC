import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Leagues from './pages/Leagues';
import Favorites from './pages/Favorites';

const Tabs = createBottomTabNavigator();

export default function createRouter() {
  return (
    <>
      <Tabs.Navigator
        tabBarOptions={{
          activeTintColor: '#20232a',
          inactiveTintColor: '#999',
          inactiveBackgroundColor: '#fff',
          activeBackgroundColor: '#f5f5f5',
          style: {
            backgroundColor: '#fff',
          },
          keyboardHidesTabBar: true,
        }}
      >
        <Tabs.Screen
          name="Leagues"
          component={Leagues}
          options={{
            tabBarLabel: 'Ligas',
            tabBarIcon: () => <Icon name="trophy" size={20} color="#20232a" />,
          }}
        />

        <Tabs.Screen
          name="Favorites"
          component={Favorites}
          options={{
            tabBarLabel: 'Favoritos',
            tabBarIcon: () => <Icon name="star" size={20} color="#20232a" />,
          }}
        />
      </Tabs.Navigator>
    </>
  );
}
