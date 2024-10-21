import { createCustomerAPI } from '@apis/customers/customers';
import { Button, FormInput, Typography } from '@components/atoms';
import { CurrencyInput } from '@components/atoms/CurrencyInput';
import { useTheme } from '@contexts/theme-provider';
import { zodResolver } from '@hookform/resolvers/zod';
import { customersValidator, CustomersValidator } from '@validations/customers';
import { useState } from 'react';
import { useForm, UseFormReset } from 'react-hook-form';
import { Modal, TouchableOpacity, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { Form } from 'tamagui';

interface ICustomersCardProps {
  showFormModal: boolean;
  toggleModal: (reset: UseFormReset<CustomersValidator>) => void;
}

export const CustomersDrawerForm = ({
  showFormModal,
  toggleModal,
}: ICustomersCardProps) => {
  const { colors, spacings } = useTheme();
  const { styles } = useStyles(stylesheet);

  const {
    formState: { errors, isDirty, isSubmitting, isValid },
    handleSubmit,
    control,
    reset,
  } = useForm<CustomersValidator>({
    resolver: zodResolver(customersValidator),
    mode: 'onChange',
  });

  const onSubmit = handleSubmit(async ({ name, salary, companyValue }) => {
    const removeCurrencyFormatting = (value: string) => {
      return value.replace(/\D/g, '');
    };
    const formattedSalary = removeCurrencyFormatting(salary);
    const formattedCompanyValue = removeCurrencyFormatting(companyValue);
    try {
      await createCustomerAPI({
        name,
        salary: Number(formattedSalary),
        companyValuation: Number(formattedCompanyValue),
      });
    } catch (error) {
      console.log(error, 'error');
    }

    toggleModal(reset);
  });

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showFormModal}
      onRequestClose={() => toggleModal(reset)}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        onPress={() => toggleModal(reset)}
        activeOpacity={1}
      >
        <TouchableOpacity activeOpacity={1} style={styles.drawer}>
          <View style={styles.handle} />
          <Typography variant="subTitle" fontWeight="bold" style={styles.title}>
            Criar cliente
          </Typography>
          <Form onSubmit={onSubmit}>
            <FormInput
              name={'name'}
              inputTextColor={colors.surface}
              inputPlaceholderColor={colors.opaqueSurface}
              inputBorderRadius={12}
              inputBackgroundColor="#7A7A7A"
              inputBorderColor={colors.surface}
              colorLabel={colors.accentText}
              control={control}
              label={'Nome'}
              textAlignLabel="left"
              variantLabel="regular"
              placeholder={'Digite o seu nome:'}
              required={true}
              errors={errors.name}
              errorMessage={errors.name?.message}
            />

            <CurrencyInput
              name={'salary'}
              inputTextColor={colors.surface}
              inputPlaceholderColor={colors.opaqueSurface}
              inputBorderRadius={12}
              inputBackgroundColor="#7A7A7A"
              inputBorderColor={colors.surface}
              colorLabel={colors.accentText}
              style={{ marginTop: spacings.huge }}
              inputMode="numeric"
              control={control}
              label={'Salário'}
              textAlignLabel="left"
              variantLabel="regular"
              placeholder={'Digite o salário:'}
              required={true}
              errors={errors.salary}
              errorMessage={errors.salary?.message}
            />

            <CurrencyInput
              name={'companyValue'}
              inputTextColor={colors.surface}
              inputPlaceholderColor={colors.opaqueSurface}
              inputBorderRadius={12}
              inputBackgroundColor="#7A7A7A"
              inputBorderColor={colors.surface}
              colorLabel={colors.accentText}
              style={{ marginTop: spacings.huge }}
              inputMode="numeric"
              control={control}
              label={'Valor da empresa'}
              textAlignLabel="left"
              variantLabel="regular"
              placeholder={'Digite o valor da empresa:'}
              required={true}
              errors={errors.companyValue}
              errorMessage={errors.companyValue?.message}
            />
            <Form.Trigger asChild>
              <Button
                textStyle={{ fontWeight: 'bold', fontSize: 18 }}
                size="big"
                style={{ marginTop: spacings.huge, borderRadius: 12 }}
                onPress={onSubmit}
                content={'Criar cliente'}
                isDisabled={!isValid}
              />
            </Form.Trigger>
          </Form>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
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
  },
  drawer: {
    backgroundColor: '#7A7A7A',
    paddingTop: 32,
    paddingBottom: 64,
    paddingHorizontal: 32,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  handle: {
    width: 24,
    height: 4,
    backgroundColor: theme.colors.opaqueSurface,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: theme.spacings.regular,
  },
  title: {
    color: theme.colors.accentText,
    marginBottom: theme.spacings.big,
  },
}));
