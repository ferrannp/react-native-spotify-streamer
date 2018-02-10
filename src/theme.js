/* @flow */

import type { Theme } from 'react-native-paper/src/types';
import { DarkTheme } from 'react-native-paper';

type ThemeColors = {
  colors: {
    divider: '#95898E',
  },
};

export type ThemeType = Theme & ThemeColors;

const theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#373C3F',
    divider: '#95898E',
    primary: '#18D1A8',
    secondaryText: '#D9D7DA',
  },
};

export default theme;
