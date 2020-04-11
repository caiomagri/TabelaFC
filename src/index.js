import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import LeagueDetail from './pages/LeagueDetail';

import App from './App';

const Stack = createStackNavigator();

export default function Index() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#363636" />
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Home" component={App} />
        <Stack.Screen name="LeagueDetail" component={LeagueDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
