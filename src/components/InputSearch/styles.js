import styled from 'styled-components/native';
import { lighten } from 'polished';

export const Input = styled.TextInput`
  margin: 10px;
  padding: 10px;
  border-radius: 4px;
  background: ${props => lighten(0.1, props.theme.colors.background)};
  border: 0.1px solid ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.text};
`;
