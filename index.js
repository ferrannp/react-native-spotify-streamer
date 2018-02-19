/* @flow */

import { AppRegistry } from 'react-native';

import './ReactotronConfig';
import Root from './src/root';
import playerHandler from './player-handler';
import store from './src/redux/store';

if (global.__DEV__) {
  // $FlowFixMe this property is on RN
  console.ignoredYellowBox = ['Remote debugger']; // eslint-disable-line no-console
}

AppRegistry.registerComponent('ReactNativeSpotifyStreamer', () => Root);
AppRegistry.registerHeadlessTask('TrackPlayer', () =>
  playerHandler(store.dispatch)
);
