import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  align-items: center;
  justify-content: center;
`;

export const Logo = styled.Image`
  height: 100px;
  width: 100px;
  margin: 5px 20px;
`;
export const Title = styled.Text`
  font-size: 20px;
  color: ${props => props.theme.colors.text};
  font-weight: bold;
  text-align: center;
`;

export const CalendarView = styled.View`
  flex-direction: row;
  align-self: flex-end;
  margin-top: 10px;
  margin-right: 10px;
`;

export const EmptyData = styled.Text`
  color: ${props => props.theme.colors.text};
  text-align: center;
  margin-top: 50px;
`;
