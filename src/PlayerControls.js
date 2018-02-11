/* @flow */

import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { withTheme } from 'react-native-paper';

import type { ThemeType } from './theme';
import TouchableIcon from './components/TouchableIcon';

type Props = {
  theme: ThemeType,
  isPlaying: boolean,
  isTrack: boolean,
};

class PlayerControls extends Component<Props> {
  render() {
    const { theme, isPlaying, isTrack } = this.props;
    return (
      <View
        style={[
          styles.playerContainer,
          { backgroundColor: theme.colors.primary },
        ]}
      >
        <TouchableIcon
          name="fast-rewind"
          style={styles.iconButton}
          onPress={() => {}}
          disabled={!isTrack}
        />
        <TouchableIcon
          name={isPlaying ? 'pause' : 'play-arrow'}
          style={styles.iconButton}
          onPress={() => {}}
          disabled={!isTrack}
        />
        <TouchableIcon
          name="fast-forward"
          style={styles.iconButton}
          onPress={() => {}}
          disabled={!isTrack}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  playerContainer: {
    flexDirection: 'row',
    height: 80,
  },
  iconButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default withTheme(PlayerControls);
