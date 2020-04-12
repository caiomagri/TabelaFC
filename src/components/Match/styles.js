import styled from 'styled-components/native';
import Team from '../Team';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Info = styled.View`
  align-items: center;
  justify-content: center;
`;

export const HomeTeam = styled(Team)``;
export const AwayTeam = styled(Team)``;

export const Versus = styled.Text`
  font-size: 30px;
  text-transform: uppercase;
  color: ${props => props.theme.colors.text};
`;

export const DateTime = styled.Text`
  font-size: 12px;
  text-transform: uppercase;
  color: ${props => props.theme.colors.text};
`;
