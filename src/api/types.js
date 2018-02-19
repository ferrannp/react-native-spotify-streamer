/* @flow */

export type TrackResult = {
  tracks: {
    items: Array<TrackType>,
  },
};

export type TokenResult = {
  response: {
    access_token: string,
  },
};

export type AlbumType = {
  name: string,
  images: Array<{
    height: number,
    url: string,
    width: number,
  }>,
};

export type ArtistType = {
  name: string,
};

export type TrackType = {
  album: AlbumType,
  artists: Array<ArtistType>,
  duration_ms: number,
  id: string,
  name: string,
  preview_url: string,
};
