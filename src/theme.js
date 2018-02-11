/* @flow */

import type { Theme } from 'react-native-paper/src/types';
import { DarkTheme } from 'react-native-paper';

type ThemeColors = {
  colors: {
    icon: string,
    divider: string,
    ripple: string,
  },
};

export type ThemeType = Theme & ThemeColors;

const theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#373C3F',
    divider: '#95898E',
    icon: '#FFFFFF',
    primary: '#18D1A8',
    ripple: 'rgba(255, 255, 255, .20)',
    secondaryText: '#D9D7DA',
  },
};

export default theme;
