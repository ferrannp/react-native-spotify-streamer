/* @flow */

import React, { Component, Fragment } from 'react';
import {
  AsyncStorage,
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { SearchBar, withTheme } from 'react-native-paper';
import Rx from 'rxjs/Rx';
import type { Theme } from 'react-native-paper/src/types';

import { authHeaders, fetchSearch, getToken, tokenHeaders } from './api/api';
import type { TokenResult, TrackResult, TrackType } from './api/types';
import TrackList from './TrackList';

type Props = {
  theme: Theme,
};

type State = {
  accessToken: string,
  query: string,
  tracks: Array<TrackType>,
};

class App extends Component<Props, State> {
  token$ = null;
  searchInput$ = null;

  state = {
    accessToken: '',
    query: '',
    tracks: [],
  };

  componentDidMount() {
    this.initAccessToken();
    this.initSearchInput();
  }

  componentWillUnmount() {
    // $FlowFixMe
    this.searchInput$.unsubscribe();
    if (this.token$) {
      this.token$.unsubscribe();
    }
  }

  initAccessToken = async () => {
    const accessToken = await AsyncStorage.getItem('@AccessToken');
    if (accessToken) {
      this.setState({ accessToken });
    } else {
      this.token$ = this.getAccessToken();
    }
  };

  getAccessToken = () => {
    const token$ = new Rx.Subject();
    token$
      .take(1)
      .switchMap(() =>
        Rx.Observable.ajax
          .post(getToken(), { grant_type: 'client_credentials' }, tokenHeaders)
          .map(result => result)
          .catch(() => Rx.Observable.empty())
      )
      .subscribe((result: TokenResult) => {
        const accessToken = result.response.access_token;
        this.setState({ accessToken }, async () => {
          // Ready to retry the query
          await AsyncStorage.setItem('@AccessToken', accessToken);
          // $FlowFixMe
          this.searchInput$.next(this.state.query);
        });
      });
    token$.next();
    return token$;
  };

  initSearchInput = () => {
    this.searchInput$ = new Rx.Subject();
    this.searchInput$
      .debounceTime(300)
      .switchMap(query =>
        Rx.Observable.ajax
          .getJSON(fetchSearch(query), authHeaders(this.state.accessToken))
          .map((result: TrackResult) => result)
          .catch((e: { status: number }) => {
            if (e.status === 401) {
              // Handle token expiration
              this.token$ = this.getAccessToken();
            }
            return Rx.Observable.empty();
          })
      )
      .subscribe((result: TrackResult) => {
        this.setState({ tracks: result.tracks.items });
      });
  };

  onArtistChange = query => {
    this.setState({ query, tracks: !query ? [] : this.state.tracks }, () => {
      if (query) {
        // $FlowFixMe
        this.searchInput$.next(query);
      }
    });
  };

  renderBody = () => {
    const { query, tracks } = this.state;

    return (
      <Fragment>
        <SearchBar
          autoCorrect={false}
          placeholder="Type a track name"
          onChangeText={this.onArtistChange}
          value={query}
        />
        <TrackList tracks={tracks} />
      </Fragment>
    );
  };

  render() {
    const { theme } = this.props;
    const { accessToken } = this.state;

    return (
      <View
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <StatusBar barStyle="light-content" />
        {!!accessToken && this.renderBody()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 24 : 0,
  },
});

export default withTheme(App);
