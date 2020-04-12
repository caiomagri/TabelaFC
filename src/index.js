import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { StatusBar } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import light from './styles/themes/light';
import dark from './styles/themes/dark';

import LeagueDetail from './pages/LeagueDetail';
import Matches from './pages/Matches';
import SwitchDarkMode from './components/SwitchDarkMode';

import App from './App';

const Stack = createStackNavigator();

export default function Index() {
  const [theme, setTheme] = useState(light);

  async function setThemeToStorage(key, value) {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    setTheme(value);
  }

  useEffect(() => {
    async function loadTheme() {
      const themeStoraged = JSON.parse(await AsyncStorage.getItem('theme'));

      if (themeStoraged !== null) {
        setThemeToStorage('theme', themeStoraged);
      } else {
        setThemeToStorage('theme', light);
      }
    }

    loadTheme();
  }, []);

  const toggleTheme = () => {
    setThemeToStorage('theme', theme.title === 'light' ? dark : light);
  };

  return (
    <ThemeProvider theme={theme}>
      <SwitchDarkMode onValueChange={toggleTheme} />
      <NavigationContainer>
        <StatusBar barStyle="light-content" backgroundColor="#363636" />
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Home" component={App} />
          <Stack.Screen name="LeagueDetail" component={LeagueDetail} />
          <Stack.Screen name="Matches" component={Matches} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
