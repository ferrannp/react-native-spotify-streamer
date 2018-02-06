/* @flow */

import { CLIENT_ID, CLIENT_SECRET } from '../../secrets';

const Buffer = require('buffer/').Buffer;

const BASE_URL = 'https://api.spotify.com/v1';

export const authHeaders = (token: string) => ({
  Authorization: `Bearer ${token}`,
});

export const tokenHeaders = {
  Authorization: `Basic ${new Buffer(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
    'base64'
  )}`,
};

export const getToken = () => 'https://accounts.spotify.com/api/token';

export const fetchSearch = (query: string) =>
  `${BASE_URL}/search?q=${query}&type=track`;
