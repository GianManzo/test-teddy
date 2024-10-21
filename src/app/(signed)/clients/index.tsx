import React from 'react';
import {
  deleteClientAPI,
  IClients,
  listClientsAPI,
} from '@apis/clients/clients';
import { Button } from '@components/atoms';
import { Typography } from '@components/atoms/Typography';
import { useTheme } from '@contexts/theme-provider';
import { ClientsValidator } from '@validations/clients';
import { useEffect, useState, useCallback } from 'react';
import { UseFormReset, UseFormTrigger } from 'react-hook-form';

import {
  FlatList,
  SafeAreaView,
  ScrollView,
  TextInput,
  View,
} from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { ClientsDrawerForm } from '@moduleComponents/clients/ClientsDrawerForm';
import { ClientsCard } from '@moduleComponents/clients/ClientsCard';
import { ConfirmModal } from '@components/molecules/ConfirmModal';
import { Spinner } from 'tamagui';

export default function ClientsScreen() {
  const { colors } = useTheme();
  const { styles } = useStyles(stylesheet);
  const [clients, setClients] = useState<IClients[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [clientToDelete, setClientToDelete] = useState<IClients | null>(null);
  const [clientToEdit, setClientToEdit] = useState<IClients | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const toggleModal = (
    reset: UseFormReset<ClientsValidator>,
    trigger: UseFormTrigger<ClientsValidator>
  ) => {
    setShowFormModal(!showFormModal);
    if (showFormModal) {
      setClientToEdit(null);
      reset();
    }
    trigger();
  };
  const listClients = useCallback(
    async (page = 1) => {
      setIsLoading(true);
      try {
        const clients = await listClientsAPI({
          page,
          perPage,
        });
        setClients(clients.data.clients);
        setTotalPages(clients.data.totalPages);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
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
      setCurrentPage(1);
    }
  };

  const Pagination = () => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <Button
          key={i}
          textStyle={{
            fontWeight: 'bold',
            fontSize: 14,
            color: i === currentPage ? colors.accentText : colors.fullColor,
          }}
          style={{
            borderWidth: 0,
            padding: 10,
            backgroundColor:
              i === currentPage ? colors.primary : colors.background,
          }}
          variant="outlined"
          onPress={() => setCurrentPage(i)}
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

  const handleDelete = async () => {
    if (clientToDelete !== null) {
      setClients(clients.filter(client => client.id !== clientToDelete.id));
      try {
        await deleteClientAPI({ id: clientToDelete.id });
      } catch (error) {
        console.log(error);
      } finally {
        setShowConfirmModal(false);
        setClientToDelete(null);
      }
    }
  };

  const openConfirmModal = (clients: IClients) => {
    setClientToDelete(clients);
    setShowConfirmModal(true);
  };

  const onRefresh = async () => {
    setIsRefreshing(true);
    await listClients(currentPage);
    setIsRefreshing(false);
  };

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
          value={perPage.toString()}
          style={styles.numericInput}
          keyboardType="numeric"
          maxLength={2}
          onChangeText={handlePerPageChange}
        />
      </View>
      <View style={styles.container}>
        {isLoading ? (
          <Spinner size="large" color={colors.primary} />
        ) : (
          <FlatList
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            showsVerticalScrollIndicator={false}
            data={clients}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <ClientsCard
                onEdit={() => {
                  setClientToEdit(item);
                  setShowFormModal(true);
                }}
                client={item}
                onDelete={() => openConfirmModal(item)}
              />
            )}
            ListFooterComponent={
              <>
                <Button
                  size="big"
                  textStyle={{ fontWeight: 'bold', fontSize: 14 }}
                  style={{ width: '100%' }}
                  variant="outlined"
                  onPress={() => {
                    setClientToEdit(null);

                    setShowFormModal(true);
                  }}
                  content="Criar cliente"
                />
                <View
                  style={{
                    alignItems: 'center',
                  }}
                >
                  <Pagination />
                </View>
              </>
            }
          />
        )}
      </View>

      <ConfirmModal
        handleDelete={handleDelete}
        setShowConfirmModal={setShowConfirmModal}
        showConfirmModal={showConfirmModal}
        variantMessage={clientToDelete?.name}
      />

      <ClientsDrawerForm
        setClients={setClients}
        clientToEdit={clientToEdit}
        toggleModal={toggleModal}
        showFormModal={showFormModal}
      />
    </SafeAreaView>
  );
}

const stylesheet = createStyleSheet(theme => ({
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
}));
