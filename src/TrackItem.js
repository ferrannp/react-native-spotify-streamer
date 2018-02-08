/* @flow */

import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, withTheme } from 'react-native-paper';
import type { Theme } from 'react-native-paper/src/types';

import type { TrackType } from './api/types';

type Props = {
  selected?: boolean,
  theme: Theme,
  track: TrackType,
};

class TrackItem extends PureComponent<Props> {
  render() {
    const { selected, theme, track } = this.props;
    const { artists, name } = track;
    const artist = artists[0];
    return (
      <View style={styles.container}>
        <View
          style={[
            styles.selected,
            selected && { backgroundColor: theme.colors.primary },
          ]}
        />
        <View style={styles.content}>
          <Text
            numberOfLines={2}
            style={[styles.title, { fontFamily: theme.fonts.medium }]}
          >
            {name}
          </Text>
          <Text numberOfLines={2} style={styles.artist}>
            {artist.name}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingRight: 16,
    paddingVertical: 12,
  },
  content: {
    paddingLeft: 24,
  },
  title: {
    fontSize: 15,
    paddingBottom: 2,
  },
  artist: {
    fontSize: 14,
    paddingTop: 2,
  },
  selected: {
    width: 4,
  },
});

export default withTheme(TrackItem);
