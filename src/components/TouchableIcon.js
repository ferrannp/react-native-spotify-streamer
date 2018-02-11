/* @flow */

import * as React from 'react';
import { TouchableRipple, withTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

import type { ThemeType } from '../theme';

type Props = {
  borderless?: boolean,
  disabled?: boolean,
  name: string,
  iconStyle?: any, // eslint-disable-line flowtype/no-weak-types
  style?: any, // eslint-disable-line flowtype/no-weak-types
  onPress: () => void,
  theme: ThemeType,
};

const TouchableIcon = ({
  borderless = true,
  disabled = false,
  name,
  iconStyle,
  style,
  onPress,
  theme,
}: Props) => (
  <TouchableRipple
    borderless={borderless}
    disabled={disabled}
    onPress={onPress}
    style={[style, disabled && { opacity: 0.5 }]}
  >
    <Icon
      style={[{ color: theme.colors.icon }, iconStyle]}
      name={name}
      size={36}
    />
  </TouchableRipple>
);

export default withTheme(TouchableIcon);
