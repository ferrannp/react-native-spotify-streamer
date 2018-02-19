/* @flow */

import type { ActionType } from '../types';

export const PLAYBACK_STATE = 'PLAYBACK_STATE';

type State = {
  playerState: ?string,
};

const initialState = {
  playerState: null,
};

export default function reducer(
  state: State = initialState,
  action: ActionType
) {
  switch (action.type) {
    case PLAYBACK_STATE:
      return { ...state, ...{ playerState: action.payload } };
    default:
      return state;
  }
}

export const playbackState = (payload: string) => ({
  type: PLAYBACK_STATE,
  payload,
});
