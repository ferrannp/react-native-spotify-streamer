/* @flow */

import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { SearchBar, withTheme } from 'react-native-paper';
import type { Theme } from 'react-native-paper/src/types';

type Props = {
  theme: Theme,
};

type State = {
  artistName: string,
};

class App extends Component<Props, State> {
  state = {
    artistName: '',
  };

  onArtistChange = artistName => {
    this.setState({ artistName });
  };

  render() {
    const { theme } = this.props;
    const { artistName } = this.state;

    return (
      <View
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <SearchBar
          placeholder="Type an artist name"
          onChangeText={this.onArtistChange}
          value={artistName}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default withTheme(App);
