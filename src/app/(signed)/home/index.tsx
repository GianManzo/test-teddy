import { Typography } from '@components/atoms/Typography';

import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

export default function HomeScreen() {
  const { t } = useTranslation();
  return (
    <View>
      <Typography>{t('HomeScreen')}</Typography>
    </View>
  );
}
