/* @flow */

import * as React from 'react';
import { Provider as PaperProvider, DarkTheme } from 'react-native-paper';

import App from './App';

const theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#18D1A8',
    divider: '#95898E',
  },
};

function Root() {
  return (
    <PaperProvider theme={theme}>
      <App />
    </PaperProvider>
  );
}

export default Root;
