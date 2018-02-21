/* @flow */

import { Alert } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import { playbackState } from './src/redux/ducks/player';
import type { DispatchType } from './src/redux/types';

type Data = {
  type: string,
  position: number,
  ducking: number,
  error: string,
  state: string,
};

async function playerHandler(dispatch: DispatchType, data: Data) {
  switch (data.type) {
    // Forward remote events to the player
    case 'remote-play':
      TrackPlayer.play();
      break;
    case 'remote-pause':
      TrackPlayer.pause();
      break;
    case 'remote-stop':
      TrackPlayer.stop();
      break;
    case 'remote-next':
      TrackPlayer.skipToNext();
      break;
    case 'remote-previous':
      TrackPlayer.skipToPrevious();
      break;
    case 'remote-seek':
      TrackPlayer.seekTo(data.position);
      break;
    // You can make ducking smoother by adding a fade in/out
    case 'remote-duck':
      TrackPlayer.setVolume(data.ducking ? 0.5 : 1);
      break;
    // Playback updates
    case 'playback-state': {
      dispatch(playbackState(data.state));
      break;
    }
    case 'playback-track-changed':
      break;
    case 'playback-error':
      Alert.alert('An error occurred', data.error);
      break;
    default:
      break;
  }
}

export default function(dispatch: DispatchType) {
  return playerHandler.bind(null, dispatch);
}
