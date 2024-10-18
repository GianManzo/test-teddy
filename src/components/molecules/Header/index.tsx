import React from 'react';
import { spacings } from '@design/spacings';
import { IHeaderProps } from './header.interface';
import { XStack } from 'tamagui';
import { Typography } from '@components/atoms/Typography';
import { Logo } from '@components/atoms';
import { useTheme } from '@contexts/theme-provider';

export const Header = ({
  avatar,
  content,
  color,
  sideElements,
  ...rest
}: IHeaderProps) => {
  const { colors } = useTheme();
  return (
    <XStack
      shadowOffset={{ width: 0, height: 2 }}
      shadowColor="black"
      shadowOpacity={0.04}
      backgroundColor={colors.surface}
      justifyContent="space-between"
      alignItems="center"
      w="100%"
      paddingVertical={spacings.regular}
      {...rest}
    >
      <XStack alignItems="center">
        <Logo />

        {content && (
          <Typography style={{ marginLeft: spacings.small }}>
            {content}
          </Typography>
        )}
      </XStack>
      {sideElements && <XStack>{sideElements}</XStack>}
    </XStack>
  );
};
