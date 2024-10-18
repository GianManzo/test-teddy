import { Card } from '@components/atoms/Card';
import { Typography } from '@components/atoms/Typography';
import { useTheme } from '@contexts/theme-provider';
import { CustomersCard } from '@moduleComponents/customers/CustomersCard';
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
      }}
    >
      <CustomersCard />
      <CustomersCard />
      <CustomersCard />
    </View>
  );
}
