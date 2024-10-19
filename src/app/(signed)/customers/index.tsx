import { Button } from '@components/atoms';
import { Card } from '@components/atoms/Card';
import { Typography } from '@components/atoms/Typography';
import { useTheme } from '@contexts/theme-provider';
import { CustomersCard } from '@moduleComponents/customers/CustomersCard';
import { CustomersDrawerForm } from '@moduleComponents/customers/CustomersDrawerForm';
import { CustomersValidator } from '@validations/customers';
import { useState } from 'react';
import { UseFormReset } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { TextInput, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export default function CustomersScreen() {
  const { colors } = useTheme();
  const { styles } = useStyles(stylesheet);

  const [showFormModal, setShowFormModal] = useState(false);

  const toggleModal = (reset: UseFormReset<CustomersValidator>) => {
    setShowFormModal(!showFormModal);
    if (showFormModal) reset();
  };

  const teste = 2;

  const { t } = useTranslation();
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 20,
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
      <CustomersDrawerForm
        toggleModal={toggleModal}
        showFormModal={showFormModal}
      />

      <Button
        size="big"
        textStyle={{ fontWeight: 'bold', fontSize: 14 }}
        style={{ width: '100%' }}
        variant="outlined"
        onPress={() => setShowFormModal(true)}
        content="Criar cliente"
      />
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
