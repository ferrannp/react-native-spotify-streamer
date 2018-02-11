// See https://github.com/oblador/react-native-vector-icons/issues/626
const blacklist = require('metro/src/blacklist'); // eslint-disable-line import/no-extraneous-dependencies

module.exports = {
  getBlacklistRE() {
    return blacklist([/react-native\/local-cli\/core\/__fixtures__.*/]);
  },
};
