import React from 'react';

import { Container, Input } from './styles';

export default function InputSearch({ onChangeText, value }) {
  return (
    <Container>
      <Input
        placeholder="Buscar por país de origem ..."
        placeholderTextColor="black"
        onChangeText={onChangeText}
        value={value}
      />
    </Container>
  );
}
