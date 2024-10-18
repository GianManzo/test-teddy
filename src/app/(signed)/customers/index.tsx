import { Card } from '@components/atoms/Card';
import { Typography } from '@components/atoms/Typography';
import { useTheme } from '@contexts/theme-provider';
import { CustomersCard } from '@moduleComponents/customers/CustomersCard';
import { useTranslation } from 'react-i18next';
import { TextInput, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export default function CustomersScreen() {
  const { colors } = useTheme();
  const { styles } = useStyles(stylesheet);

  const teste = 2;

  const { t } = useTranslation();
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
      }}
    >
      <Typography style={{ marginTop: 20 }} variant="subTitle">
        <Typography fontWeight="700" variant="subTitle">
          {`${teste} `}
        </Typography>
        clientes encontrados:
      </Typography>
      <View style={styles.containerPerPage}>
        <Typography variant="subTitle">Clientes por página:</Typography>
        <TextInput
          style={styles.numericInput}
          keyboardType="numeric"
          maxLength={2}
        />
      </View>
      <CustomersCard />
    </View>
  );
}

const stylesheet = createStyleSheet(theme => ({
  numericInput: {
    borderWidth: 1,
    borderColor: theme.colors.halfColor,
    borderRadius: 4,
    marginLeft: 10,
    padding: 5,
    width: 50,
    textAlign: 'center',
  },
  containerPerPage: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
}));
