import React from 'react';
import { Image, Stack } from 'tamagui';
import { ILogoProps } from './logo.interfaces';

export const Logo = ({ onPress }: ILogoProps) => {
  return (
    <Stack onPress={onPress}>
      <Image
        source={{
          uri: 'https://s3-alpha-sig.figma.com/img/4275/10ac/9ece7d6223d4590e314f0de127d95ff9?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qoaZbI6Na9XIXNdBS4Z7b-kRlc45oL-r0hpCUZxezMFpyBCmbe3AhRQ2x8c0bS6NUC0rps0uzCxShcoxfcAl-OWFBOShgrAsNrozSBpdavXv6vj7NiuTa~0IFioQgEBPywBzOYmM5rb~nJMDO0lv4BADB2M8SThGo2xPfXKbcq0LE3~4VjWSheYSqU-OjZxg6ZRKRlrjmJxJo75HLke8ugOQATxMpwK2bbQkIKEz6UzUDX49D8oCLvtU8v-25PkU4RnoGF6gASjdPqR~Ub2ofZp6zaCpuoJ4WsiloQnexM3TQRWaZ-uX4fG2qb8w2kjk3x1hrJeoIT7uKWO4-~dqDA__',
          width: 70,
          height: 34,
        }}
      />
    </Stack>
  );
};
