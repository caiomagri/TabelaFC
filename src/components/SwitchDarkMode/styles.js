import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  margin: 5px;
`;

export const Title = styled.Text`
  font-size: 16px;
  color: ${props => props.theme.colors.text};
  font-weight: bold;
  overflow: hidden;
  text-align: center;
`;
