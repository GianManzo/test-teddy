import 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Slot } from 'expo-router';

import { I18nextProvider } from 'react-i18next';
import i18n from '@translations/i18n';
import { TamaguiProvider } from 'tamagui';
import tamaguiConfig from '../tamagui.config';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ThemeProvider from '@contexts/theme-provider';

import '../unistyles';

export default function RootLayout() {
  const queryClient = new QueryClient();

  return (
    <TamaguiProvider config={tamaguiConfig}>
      <ThemeProvider>
        <I18nextProvider i18n={i18n}>
          <QueryClientProvider client={queryClient}>
            <SafeAreaProvider>
              <Slot />
            </SafeAreaProvider>
          </QueryClientProvider>
        </I18nextProvider>
      </ThemeProvider>
    </TamaguiProvider>
  );
}
