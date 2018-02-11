/* @flow */

import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, TouchableRipple, withTheme } from 'react-native-paper';

import type { TrackType } from './api/types';
import type { ThemeType } from './theme';

type Props = {
  selectedId: string,
  theme: ThemeType,
  track: TrackType,
  onTrackSelected: (track: TrackType) => void,
};

class TrackItem extends PureComponent<Props> {
  onTrackSelected = () => {
    this.props.onTrackSelected(this.props.track);
  };

  render() {
    const { selectedId, theme, track } = this.props;
    const { artists, name } = track;
    const artist = artists[0];

    return (
      <TouchableRipple
        rippleColor={theme.colors.ripple}
        onPress={this.onTrackSelected}
      >
        <View style={styles.container}>
          <View
            style={[
              styles.selected,
              selectedId === track.id && {
                backgroundColor: theme.colors.primary,
              },
            ]}
          />
          <View style={styles.content}>
            <Text
              numberOfLines={2}
              style={[styles.title, { fontFamily: theme.fonts.medium }]}
            >
              {name}
            </Text>
            <Text
              numberOfLines={2}
              style={[
                styles.artist,
                {
                  color: theme.colors.secondaryText,
                  fontFamily: theme.fonts.medium,
                },
              ]}
            >
              {artist.name.toUpperCase()}
            </Text>
          </View>
        </View>
      </TouchableRipple>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingRight: 16,
  },
  content: {
    paddingLeft: 24,
    paddingVertical: 12,
  },
  title: {
    fontSize: 15,
    paddingBottom: 2,
  },
  artist: {
    fontSize: 13,
    paddingTop: 2,
  },
  selected: {
    width: 5,
  },
});

export default withTheme(TrackItem);
