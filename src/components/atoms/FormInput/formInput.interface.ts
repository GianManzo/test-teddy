import { FieldError } from 'react-hook-form';
import { StyleProp, ViewStyle } from 'react-native';
import { TypographyVariants } from '../Typography/typography.interfaces';

export interface IFormInputProps {
  control: any;
  name: string;
  placeholder: string;
  label?: string;
  required?: boolean;
  errors?: FieldError;
  helperText?: string;
  errorMessage?: string;
  inputMode?: 'text' | 'numeric' | 'decimal' | 'email' | 'tel' | 'url';
  type?: 'text' | 'password';
  style?: StyleProp<ViewStyle>;
  textAlignLabel?: 'left' | 'center' | 'right';
  variantLabel?: TypographyVariants;
}
