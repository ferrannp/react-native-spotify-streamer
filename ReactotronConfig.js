/* @flow */

if (global.__DEV__) {
  // eslint-disable-next-line global-require, import/no-extraneous-dependencies
  const Reactotron = require('reactotron-react-native').default;
  Reactotron.configure()
    .useReactNative()
    .connect();

  global.log = Reactotron.log;
}
