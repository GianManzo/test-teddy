import { colors, darkColors } from './colors';
import { spacings } from './spacings';

export const lightTheme = {
  colors: colors,
  spacings: spacings,
} as const;

export const darkTheme = {
  colors: darkColors,
  spacings: spacings,
} as const;
