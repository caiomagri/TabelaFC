import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import PropTypes from 'prop-types';

import { Input } from './styles';

export default function InputSearch({ onChangeText, value, placeholder }) {
  const { colors } = useContext(ThemeContext);

  return (
    <Input
      placeholder={placeholder}
      placeholderTextColor={colors.text}
      onChangeText={onChangeText}
      value={value}
    />
  );
}

InputSearch.propTypes = {
  onChangeText: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};
