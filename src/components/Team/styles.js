import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

export const Logo = styled.Image`
  height: 50px;
  width: 50px;
  margin: 5px 10px;
`;
export const Title = styled.Text`
  font-size: 14px;
  color: ${props => props.theme.colors.text};
  font-weight: bold;
  overflow: hidden;
  text-align: center;
`;
