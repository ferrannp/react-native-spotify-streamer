/* @flow */

import * as React from 'react';
import { Provider as PaperProvider, DarkTheme } from 'react-native-paper';

import App from './App';

function Root() {
  return (
    <PaperProvider theme={DarkTheme}>
      <App />
    </PaperProvider>
  );
}

export default Root;
