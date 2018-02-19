/* @flow */

import * as React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';

import App from './App';
import theme from './theme';
import store from './redux/store';

function Root() {
  return (
    <ReduxProvider store={store}>
      <PaperProvider theme={theme}>
        <App />
      </PaperProvider>
    </ReduxProvider>
  );
}

export default Root;
