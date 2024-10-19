import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { AuthValidator, authValidator } from '@validations/auth';
import { useAuth } from '@contexts/auth-provider';
import { spacings } from '@design/spacings';
import { Button } from '@components/atoms/Button';
import { FormInput } from '@components/atoms/FormInput';
import { signInAPi } from '@apis/auth/sign-in';
import { Form } from 'tamagui';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { useTheme } from '@contexts/theme-provider';
import { Typography } from '@components/atoms';

export default function SignInScreen() {
  const router = useRouter();
  const {
    formState: { errors, isDirty, isSubmitting },
    handleSubmit,
    control,
  } = useForm<AuthValidator>({
    resolver: zodResolver(authValidator),
  });
  const { colors } = useTheme();
  const { login, status } = useAuth();

  const { styles } = useStyles(stylesheet);

  const isLoading = status === 'pending' && isSubmitting;

  const onSubmit = handleSubmit(async ({ name }) => {
    if (name) {
      router.push('/(signed)/customers');
    }
  });

  return (
    <View style={styles.container}>
      <Typography variant="title">Olá, seja bem-vindo!</Typography>
      <Form style={{ width: '100%', maxWidth: 350 }} onSubmit={onSubmit}>
        <FormInput
          inputBorderColor={colors.opaqueSurface}
          inputSize="big"
          control={control}
          name={'name'}
          placeholder={'Digite o seu nome:'}
          required={true}
          errors={errors.name}
          errorMessage={errors.name?.message}
        />

        <Form.Trigger asChild>
          <Button
            size="big"
            style={{ marginTop: spacings.big }}
            isLoading={isLoading}
            onPress={onSubmit}
            content={'Entrar'}
          />
        </Form.Trigger>
      </Form>
    </View>
  );
}

const stylesheet = createStyleSheet(theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    padding: spacings.big,
    gap: spacings.regular,
    backgroundColor: theme.colors.background,
  },
}));
