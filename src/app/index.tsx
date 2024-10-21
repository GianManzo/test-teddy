import { Redirect } from 'expo-router';
import { useFonts } from 'expo-font';
import { View } from 'react-native';
import { Spinner } from 'tamagui';

export default function SignedLayout() {
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  if (!loaded) {
    return (
      <View>
        <Spinner size="large" />
      </View>
    );
  } else {
    return <Redirect href="/(auth)/sign-in" />;
  }
}
