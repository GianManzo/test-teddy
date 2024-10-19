import { Icon, Typography } from '@components/atoms';
import { Card } from '@components/atoms/Card';
import { useTheme } from '@contexts/theme-provider';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

interface ICustomersCardProps {}

export const CustomersCard = ({}: ICustomersCardProps) => {
  const { colors, spacings } = useTheme();
  const { styles } = useStyles(stylesheet);

  const renderHeader = () => {
    return (
      <Typography fontWeight="700" variant="subTitle">
        Eduardo
      </Typography>
    );
  };
  const renderFooter = () => {
    return (
      <View style={styles.footerContainer}>
        <Icon name="plus" size={20} onPress={() => console.log('Adicionar')} />
        <Icon name="edit" size={20} onPress={() => console.log('Editar')} />
        <Icon
          name="delete"
          color={colors.error}
          size={20}
          onPress={() => console.log('Excluir')}
        />
      </View>
    );
  };

  return (
    <Card
      cardFooter={renderFooter}
      cardHeader={renderHeader}
      props={{
        width: '100%',
        minHeight: 138,
        backgroundColor: colors.surface,
        borderRadius: 4,
        marginVertical: spacings.big,
        padding: 15,
      }}
    >
      <View style={styles.cardContent}>
        <Typography style={{ marginBottom: 10 }}>
          Salário: R$3.500,00
        </Typography>
        <Typography>Empresa: R$120.000,00</Typography>
      </View>
    </Card>
  );
};

const stylesheet = createStyleSheet(theme => ({
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },

  cardContent: {
    flex: 1,
    alignItems: 'center',
    marginTop: 10,
  },
}));
