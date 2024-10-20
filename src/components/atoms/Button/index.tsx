import React, { forwardRef } from 'react';

import { Icon } from '../Icon';
import { Spinner } from 'tamagui';
import { Typography } from '../Typography';
import { IButtonProps } from './button.interfaces';
import { useButtonStyles } from './button.styles';
import { Pressable, View } from 'react-native';

export const Button = forwardRef<View, IButtonProps>(
  (
    {
      variant = 'primary',
      iconName,
      content,
      isLoading = false,
      textAlign,
      style,
      size = 'regular',
      isDisabled = false,
      textColor,
      leftComponent,
      iconSize,
      backgroundColor,
      rightIconName,
      iconColor,
      textStyle,
      ...rest
    }: IButtonProps,
    ref
  ) => {
    const { styles, innerColor, styledIconSize, textVariant } = useButtonStyles(
      variant,
      size,
      isDisabled,
      content,
      backgroundColor
    );
    const color = iconColor !== undefined ? iconColor : textColor || innerColor;

    return (
      <Pressable
        ref={ref}
        {...rest}
        disabled={isDisabled}
        style={[styles.container, style]}
      >
        {isLoading ? (
          <Spinner color={color} size="small" />
        ) : (
          <>
            {iconName && (
              <Icon
                color={color}
                size={iconSize || styledIconSize}
                name={iconName}
                style={styles.icon}
              />
            )}

            {leftComponent}

            {!!content && (
              <Typography
                variant={textVariant}
                color={textColor || innerColor}
                textAlign={textAlign}
                style={textStyle}
              >
                {content}
              </Typography>
            )}

            {rightIconName && (
              <Icon
                color={color}
                size={iconSize || styledIconSize}
                name={rightIconName}
                style={styles.rightIcon}
              />
            )}
          </>
        )}
      </Pressable>
    );
  }
);
