/* @flow */

import React, { PureComponent } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { withTheme } from 'react-native-paper';
import TrackPlayer from 'react-native-track-player';
import { connect } from 'react-redux';

import type { ThemeType } from './theme';
import TouchableIcon from './components/TouchableIcon';
import type { TrackType } from './api/types';
import { getTrackStructure } from './utils';

type Props = {
  playerState: string,
  theme: ThemeType,
  track: TrackType,
};

// The constant TrackPlayer.STATE_PLAYING is not consistent across platforms
// https://github.com/react-native-kit/react-native-track-player/issues/141
const STATE_PLAYING = Platform.OS === 'android' ? 3 : 'STATE_PLAYING';
const STATE_PAUSED = Platform.OS === 'android' ? 2 : 'STATE_PAUSED';

class PlayerControls extends PureComponent<Props> {
  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.track && this.props.track !== nextProps.track) {
      this._checkChangeSelectedTrack();
    }
  }

  _checkChangeSelectedTrack = async () => {
    let isCurrentTrack;
    isCurrentTrack = await !!TrackPlayer.getCurrentTrack().catch(() => {
      // If nothing is playing, it rejects the promise
      isCurrentTrack = false;
    });
    if (isCurrentTrack) {
      this._playNewTrack();
    }
  };

  _onPlayPause = async () => {
    const state = this.props.playerState;

    if (state === STATE_PLAYING) {
      await TrackPlayer.pause();
    } else if (state === STATE_PAUSED) {
      await TrackPlayer.play();
    } else {
      this._playNewTrack();
    }
  };

  _playNewTrack = async () => {
    const { track } = this.props;

    await TrackPlayer.reset();
    await TrackPlayer.add(getTrackStructure(track));
    await TrackPlayer.play();
  };

  render() {
    const { playerState, theme, track } = this.props;

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
          disabled={!track}
        />
        <TouchableIcon
          name={playerState === STATE_PLAYING ? 'pause' : 'play-arrow'}
          style={styles.iconButton}
          onPress={this._onPlayPause}
          disabled={!track}
        />
        <TouchableIcon
          name="fast-forward"
          style={styles.iconButton}
          onPress={() => {}}
          disabled={!track}
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

export default connect(
  state => ({
    playerState: state.player.playerState,
  }),
  null
)(withTheme(PlayerControls));
