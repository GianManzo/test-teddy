import { Typography } from '@components/atoms/Typography';
import { useTheme } from '@contexts/theme-provider';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

export default function CustomersScreen() {
  const { colors } = useTheme();

  const { t } = useTranslation();
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.background,
      }}
    >
      <Typography>{t('CustomersScreen')}</Typography>
    </View>
  );
}
