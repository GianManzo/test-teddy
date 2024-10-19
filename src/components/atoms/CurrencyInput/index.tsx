import { Controller } from 'react-hook-form';

import { Input, Stack, View } from 'tamagui';

import { spacings } from '@design/spacings';
import { useTheme } from '@contexts/theme-provider';
import { Icon, Typography } from '@components/atoms';
import {
  IFormInputProps,
  InputSize,
} from '@components/atoms/FormInput/formInput.interface';

export const CurrencyInput = ({
  inputSize = 'regular',
  control,
  name,
  label,
  placeholder,
  required = false,
  errors,
  helperText,
  errorMessage,
  inputMode = 'text',
  textAlignLabel = 'center',
  type,
  style,
  variantLabel = 'title',
  colorLabel,
  inputBackgroundColor,
  inputBorderColor,
  inputBorderRadius = 4,
  inputPlaceholderColor,
  inputTextColor,
  ...rest
}: IFormInputProps) => {
  const { colors } = useTheme();

  const handleInputSize = (size: InputSize) => {
    switch (size) {
      case 'regular':
        return '$4';
      case 'small':
        return '$3';
      case 'big':
        return '$6';
      default:
        return '$4';
    }
  };

  const formatCurrencyInput = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    return numericValue ? `R$ ${numericValue}` : '';
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: required,
      }}
      render={({ field: { onChange, onBlur, value } }) => (
        <View alignItems="center" width={'100%'} style={style}>
          <View w="100%">
            <Stack>
              {label && (
                <Typography
                  color={colorLabel}
                  variant={variantLabel}
                  textAlign={textAlignLabel}
                  style={{ marginBottom: spacings.tiny }}
                >
                  {label}
                </Typography>
              )}
              <Input
                size={handleInputSize(inputSize)}
                placeholder={placeholder}
                onBlur={onBlur}
                onChangeText={text => onChange(formatCurrencyInput(text))}
                placeholderTextColor={inputPlaceholderColor}
                value={value}
                borderRadius={inputBorderRadius}
                inputMode={inputMode}
                secureTextEntry={type === 'password'}
                style={{
                  backgroundColor: inputBackgroundColor,
                  borderColor: inputBorderColor,
                  color: inputTextColor,
                }}
                {...rest}
              />
              {helperText && <Typography>{helperText}</Typography>}
              {errors && (
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: spacings.tiny,
                  }}
                >
                  <Icon name={'alert-circle'} color={colors.error} size={16} />
                  <Typography
                    style={{ marginLeft: spacings.tiny }}
                    variant="error"
                  >
                    {errorMessage}
                  </Typography>
                </View>
              )}
            </Stack>
          </View>
        </View>
      )}
    />
  );
};
