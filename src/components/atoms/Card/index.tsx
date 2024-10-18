import type { CardProps } from 'tamagui';
import { Card as CardT } from 'tamagui';
import { Typography } from '../Typography';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { View } from 'react-native';

interface ICardProps {
  props: CardProps;
  cardHeader?: () => JSX.Element;
  cardFooter?: () => JSX.Element;
  children?: React.ReactNode;
}

export function Card({ props, cardHeader, cardFooter, children }: ICardProps) {
  const { styles } = useStyles(stylesheet);

  return (
    <CardT {...props} style={styles.card}>
      {cardHeader && <View style={styles.contentHeader}>{cardHeader()}</View>}
      {children}
      {cardFooter && <View style={styles.contentFooter}>{cardFooter()}</View>}
    </CardT>
  );
}

const stylesheet = createStyleSheet(theme => ({
  card: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  contentHeader: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentBody: {
    flex: 1,
    justifyContent: 'center',
  },
  contentFooter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
