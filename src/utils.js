/* @flow */

import type { TrackType } from './api/types';

export const getTrackStructure = (track: TrackType) => ({
  id: track.id,
  url: track.preview_url,
  title: track.name,
  artist: track.artists[0].name,
  album: track.album.name,
  artwork: track.album.images[0].url,
});

export const leftPad = (num: number, size: number) => {
  let s = `${num}`;
  while (s.length < size) s = `0${s}`;
  return s;
};
