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
  height: number,
  url: string,
  width: number,
};

export type TrackType = {
  album: AlbumType,
  name: string,
  preview_url: string,
};
