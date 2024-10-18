import { Button, FormInput, Typography } from '@components/atoms';
import { useTheme } from '@contexts/theme-provider';
import { zodResolver } from '@hookform/resolvers/zod';
import { customersValidator, CustomersValidator } from '@validations/customers';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Modal, TouchableOpacity, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { Form } from 'tamagui';

interface ICustomersCardProps {}

export const CustomersDrawerForm = ({}: ICustomersCardProps) => {
  const { colors, spacings } = useTheme();
  const { styles } = useStyles(stylesheet);
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const {
    formState: { errors, isDirty, isSubmitting, isValid },
    handleSubmit,
    control,
  } = useForm<CustomersValidator>({
    resolver: zodResolver(customersValidator),
    mode: 'onChange',
  });

  const onSubmit = handleSubmit(async ({ name, salary, companyValue }) => {
    console.log({
      name,
      salary,
      companyValue,
    });
    toggleModal();
  });

  return (
    <View style={styles.screen}>
      <TouchableOpacity onPress={toggleModal}>
        <Typography style={styles.buttonText}>Criar Cliente</Typography>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={toggleModal}
          activeOpacity={1}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={styles.drawer}
            onPress={() => {}}
          >
            <View style={styles.handle} />
            <Typography style={styles.title}>Criar cliente</Typography>
            <Form onSubmit={onSubmit}>
              <FormInput
                control={control}
                name={'name'}
                label={'Nome'}
                textAlignLabel="left"
                variantLabel="regular"
                placeholder={'Digite o seu nome:'}
                required={true}
                errors={errors.name}
                errorMessage={errors.name?.message}
              />

              <FormInput
                control={control}
                name={'salary'}
                label={'Salário'}
                textAlignLabel="left"
                variantLabel="regular"
                placeholder={'Digite o salário:'}
                required={true}
                errors={errors.salary}
                errorMessage={errors.salary?.message}
              />

              <FormInput
                control={control}
                name={'companyValue'}
                label={'Valor da empresa'}
                textAlignLabel="left"
                variantLabel="regular"
                placeholder={'Digite o valor da empresa:'}
                required={true}
                errors={errors.companyValue}
                errorMessage={errors.companyValue?.message}
              />
              <Form.Trigger asChild marginBottom={spacings.huge * 2}>
                <Button
                  size="regular"
                  style={{ marginTop: spacings.big }}
                  onPress={onSubmit}
                  content={'Entrar'}
                  isDisabled={!isValid}
                />
              </Form.Trigger>
            </Form>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const stylesheet = createStyleSheet(theme => ({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  drawer: {
    backgroundColor: '#7A7A7A',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  handle: {
    width: 50,
    height: 4,
    backgroundColor: '#ccc',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
}));
