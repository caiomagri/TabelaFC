import { lighten } from 'polished';

export default {
  title: 'dark',

  colors: {
    primary: '#222',
    secondary: '#fff',
    background: '#20232a',
    text: '#999',
    activeTintColor: '#fff',
    inactiveTintColor: '#fff',
    inactiveBackgroundColor: '#20232a',
    activeBackgroundColor: lighten(0.1, '#20232a'),
  },
};
