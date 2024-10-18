import { Typography } from '@components/atoms/Typography';

import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

export default function ProductsScreen() {
  const { t } = useTranslation();
  return (
    <View>
      <Typography>{t('ProductsScreen')}</Typography>
    </View>
  );
}
