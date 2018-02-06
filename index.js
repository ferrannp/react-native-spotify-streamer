/* @flow */

import { AppRegistry } from 'react-native';
import Root from './src/root';

if (global.__DEV__) {
  // $FlowFixMe this property is on RN
  console.ignoredYellowBox = ['Remote debugger']; // eslint-disable-line no-console
}

AppRegistry.registerComponent('ReactNativeSpotifyStreamer', () => Root);
