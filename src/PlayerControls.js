/* @flow */

import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
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

class PlayerControls extends PureComponent<Props> {
  componentWillReceiveProps(nextProps: Props) {
    if (this.props.track !== nextProps.track) {
      this._checkChangeSelectedTrack();
    }
  }

  _checkChangeSelectedTrack = async () => {
    if (await !!TrackPlayer.getCurrentTrack()) {
      this._playNewTrack();
    }
  };

  _onPlayPause = async () => {
    const state = await TrackPlayer.getState();

    if (state === TrackPlayer.STATE_PLAYING) {
      await TrackPlayer.pause();
    } else if (state === TrackPlayer.STATE_PAUSED) {
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
          name={
            playerState === TrackPlayer.STATE_PLAYING ? 'pause' : 'play-arrow'
          }
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
