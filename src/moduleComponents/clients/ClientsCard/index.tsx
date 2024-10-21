import { IClients } from '@apis/clients/clients';
import { Icon, Typography } from '@components/atoms';
import { Card } from '@components/atoms/Card';
import { useTheme } from '@contexts/theme-provider';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

interface IClientsCardProps {
  client: IClients;
  onDelete: () => void;
  onEdit: () => void;
}

export const ClientsCard = ({
  client,
  onDelete,
  onEdit,
}: IClientsCardProps) => {
  const { colors, spacings } = useTheme();
  const { styles } = useStyles(stylesheet);

  const renderHeader = () => {
    return (
      <Typography fontWeight="700" variant="subTitle">
        {client.name}
      </Typography>
    );
  };
  const renderFooter = () => {
    return (
      <View style={styles.footerContainer}>
        <Icon name="plus" size={20} onPress={() => console.log('Adicionar')} />
        <Icon name="edit" size={20} onPress={onEdit} />
        <Icon name="delete" color={colors.error} size={20} onPress={onDelete} />
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
          Salário: R${client.salary}
        </Typography>
        <Typography>Empresa: R${client.companyValuation}</Typography>
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
