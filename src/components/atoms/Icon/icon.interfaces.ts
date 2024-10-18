import { StyleProp, TextStyle } from 'react-native';

export type IconNames =
  | 'customers'
  | 'menu'
  | 'plus'
  | 'alert-circle'
  | 'bell'
  | 'home'
  | 'user'
  | 'cat';

export interface IconProps {
  onPress?: () => void;
  testID?: string;
  color?: string;
  name: IconNames;
  size?: number;
  style?: StyleProp<TextStyle>;
}
