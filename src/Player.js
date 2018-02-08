/* @flow */

import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Divider, withTheme } from 'react-native-paper';
import type { Theme } from 'react-native-paper/src/types';

type Props = {
  theme: Theme,
};

class Player extends Component<Props> {
  render() {
    const { theme } = this.props;
    return (
      <View style={styles.container}>
        {/* $FlowFixMe needs to be fixed in paper */}
        <Divider style={{ backgroundColor: theme.colors.divider }} />
        <View style={styles.trackContainer} />
        <View
          style={[
            styles.playerContainer,
            { backgroundColor: theme.colors.primary },
          ]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 220,
  },
  trackContainer: {
    height: 140,
  },
  playerContainer: {
    height: 80,
    backgroundColor: '#18D1A8',
  },
});

export default withTheme(Player);
