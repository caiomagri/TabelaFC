import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';
import { Switch } from 'react-native';

import { Container, Title } from './styles';

export default function SwitchDarkMode({ onValueChange }) {
  const { title } = useContext(ThemeContext);

  return (
    <Container>
      <Title>Dark Mode</Title>
      <Switch
        ios_backgroundColor="#3e3e3e"
        onValueChange={onValueChange}
        value={title === 'dark'}
      />
    </Container>
  );
}

SwitchDarkMode.propTypes = {
  onValueChange: PropTypes.func.isRequired,
};
