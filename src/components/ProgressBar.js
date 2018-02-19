/* @flow */

import React, { Fragment } from 'react';
import {
  ProgressBar as PaperProgressBar,
  Text,
  withTheme,
} from 'react-native-paper';
import { ProgressComponent } from 'react-native-track-player';
import { StyleSheet } from 'react-native';

import { leftPad } from '../utils';

class ProgressBar extends ProgressComponent<> {
  render() {
    const { theme } = this.props;
    const { duration, position } = this.state;

    return (
      <Fragment>
        <Text>
          0:{leftPad(Math.floor(position), 2)}
          <Text style={{ color: theme.colors.secondaryText }}>
            {' '}
            / 0:{leftPad(Math.round(duration), 2)}
          </Text>
        </Text>
        <PaperProgressBar
          style={styles.progressBar}
          progress={this.getProgress()}
        />
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  progressBar: {
    paddingVertical: 0,
  },
});

export default withTheme(ProgressBar);
