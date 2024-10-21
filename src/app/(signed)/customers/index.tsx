import React from 'react';

import {
  ICustomer,
  IListCustomer,
  listCustomersAPI,
} from '@apis/customers/customers';
import { Button } from '@components/atoms';
import { Typography } from '@components/atoms/Typography';
import { useTheme } from '@contexts/theme-provider';
import { CustomersCard } from '@moduleComponents/customers/CustomersCard';
import { CustomersDrawerForm } from '@moduleComponents/customers/CustomersDrawerForm';
import { CustomersValidator } from '@validations/customers';
import { useEffect, useState, useCallback } from 'react';
import { UseFormReset } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  TextInput,
  View,
} from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export default function CustomersScreen() {
  const { colors } = useTheme();
  const { styles } = useStyles(stylesheet);
  const [clients, setClients] = useState<ICustomer[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [perPage, setPerPage] = useState(2);

  const [showFormModal, setShowFormModal] = useState(false);

  const toggleModal = (reset: UseFormReset<CustomersValidator>) => {
    setShowFormModal(!showFormModal);
    if (showFormModal) reset();
  };

  const listClients = useCallback(
    async (page = 1) => {
      try {
        const clients = await listCustomersAPI({
          page,
          perPage,
        });
        setClients(clients.data.clients);
        setTotalPages(clients.data.totalPages);
      } catch (error) {
        console.log(error);
      }
    },
    [perPage]
  );

  useEffect(() => {
    listClients(currentPage);
  }, [currentPage, listClients]);

  const handlePerPageChange = (value: string) => {
    const numberValue = parseInt(value, 10);
    if (!isNaN(numberValue) && numberValue > 0) {
      setPerPage(numberValue);
      setCurrentPage(1); // Resetar para a primeira página quando o items per page mudar
    }
  };

  const Pagination = () => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <Button
          key={i}
          textStyle={{ fontWeight: 'bold', fontSize: 14 }}
          style={{
            padding: 10,
            margin: 5,
            backgroundColor:
              i === currentPage ? colors.primary : colors.accentText,
          }}
          variant="outlined"
          onPress={() => {
            setCurrentPage(i); // Define a página atual apenas uma vez
          }}
          content={`${i}`}
        />
      );
    }

    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.paginationContainer}>{pages}</View>
      </ScrollView>
    );
  };

  const { t } = useTranslation();
  return (
    <SafeAreaView style={styles.container}>
      <Typography style={{ marginTop: 20 }} variant="subTitle">
        <Typography fontWeight="700" variant="subTitle">
          {`${clients.length} `}
        </Typography>
        clientes encontrados:
      </Typography>
      <View style={styles.containerPerPage}>
        <Typography variant="subTitle">Clientes por página:</Typography>
        <TextInput
          style={styles.numericInput}
          keyboardType="numeric"
          maxLength={2}
          onChangeText={handlePerPageChange}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          data={clients}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <CustomersCard client={item} />}
          ListFooterComponent={
            <>
              <Button
                size="big"
                textStyle={{ fontWeight: 'bold', fontSize: 14 }}
                style={{ width: '100%' }}
                variant="outlined"
                onPress={() => setShowFormModal(true)}
                content="Criar cliente"
              />
              <Pagination />
            </>
          }
        />
      </View>

      <CustomersDrawerForm
        toggleModal={toggleModal}
        showFormModal={showFormModal}
      />
    </SafeAreaView>
  );
}

const stylesheet = createStyleSheet(theme => ({
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 20,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
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
