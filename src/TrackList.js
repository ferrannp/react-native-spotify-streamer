/* @flow */

import React, { Component, Fragment } from 'react';
import { Keyboard, FlatList, StyleSheet } from 'react-native';

import type { TrackType } from './api/types';
import TrackItem from './TrackItem';
import Player from './Player';

type Props = {
  tracks: Array<TrackType>,
};

type State = {
  selectedTrack: ?TrackType,
};

class TrackList extends Component<Props, State> {
  state = {
    selectedTrack: null,
  };

  onTrackSelected = (track: TrackType) => {
    this.setState({ selectedTrack: track }, () => Keyboard.dismiss());
  };

  render() {
    const { tracks } = this.props;
    const { selectedTrack } = this.state;

    return (
      <Fragment>
        <FlatList
          keyExtractor={item => item.id}
          data={tracks}
          keyboardShouldPersistTaps="always"
          extraData={this.state.selectedTrack}
          renderItem={({ item }) => (
            <TrackItem
              track={item}
              selectedId={selectedTrack ? selectedTrack.id : null}
              onTrackSelected={this.onTrackSelected}
            />
          )}
          contentContainerStyle={styles.listContainer}
        />
        <Player track={selectedTrack} />
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    paddingTop: 8,
    paddingBottom: 16,
  },
});

export default TrackList;
