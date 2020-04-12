import { lighten } from 'polished';

export default {
  title: 'light',

  colors: {
    primary: '#fff',
    secondary: lighten(0.1, '#20232a'),
    background: '#f5f5f5',
    text: lighten(0.1, '#20232a'),
    activeTintColor: '#999',
    inactiveTintColor: '#999',
    inactiveBackgroundColor: '#fff',
    activeBackgroundColor: '#f5f5f5',
  },
};
