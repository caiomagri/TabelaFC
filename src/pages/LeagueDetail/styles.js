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

export const ButtonView = styled.View`
  flex-direction: row;
  align-self: flex-end;
  justify-content: space-between;
  margin-top: 10px;
  margin-right: 10px;
`;

export const Button = styled.TouchableOpacity`
  height: 46px;
  border-radius: 4px;
  flex: 1;
  align-items: center;
  justify-content: center;
  margin: 0px 10px;
`;
