/* @flow */

import * as React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';

import App from './App';
import theme from './theme';

function Root() {
  return (
    <PaperProvider theme={theme}>
      <App />
    </PaperProvider>
  );
}

export default Root;
