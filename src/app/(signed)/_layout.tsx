import { Icon, Logo, Typography } from '@components/atoms';
import { Header } from '@components/molecules/Header';
import { useAuth } from '@contexts/auth-provider';
import { useTheme } from '@contexts/theme-provider';
import { spacings } from '@design/spacings';
import { Redirect, Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  createDrawerNavigator,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Image, View } from 'tamagui';

import CustomersScreen from './customers';
import ProductsScreen from './products';
import HomeScreen from './home';

export default function SignedLayout() {
  const { isLogged } = useAuth();
  const { colors } = useTheme();
  const Drawer = createDrawerNavigator();

  const insets = useSafeAreaInsets();

  // if (isLogged) {
  //   return <Redirect href="/(signed)/customers" />;
  // }

  return (
    <Drawer.Navigator
      initialRouteName="Clientes"
      screenOptions={{
        drawerPosition: 'right',
        drawerStyle: {
          backgroundColor: colors.background,
          width: 280,
        },
        header: props => (
          <Header
            sideElements={
              <Icon
                size={24}
                name="menu"
                onPress={() => props.navigation.toggleDrawer()}
              />
            }
          />
        ),
      }}
    >
      <Drawer.Screen
        name="Clientes"
        component={CustomersScreen}
        options={{
          drawerIcon: ({ color }) => <Icon color={color} name="customers" />,
        }}
      />

      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: ({ color }) => <Icon color={color} name="home" />,
        }}
      />

      <Drawer.Screen
        name="Produtos"
        component={ProductsScreen}
        options={{
          drawerIcon: ({ color }) => <Icon color={color} name="customers" />,
        }}
      />
    </Drawer.Navigator>
  );
}
