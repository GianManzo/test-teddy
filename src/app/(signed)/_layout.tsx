import { Icon } from '@components/atoms';
import { Header } from '@components/molecules/Header';

import { useTheme } from '@contexts/theme-provider';

import { createDrawerNavigator } from '@react-navigation/drawer';

import ProductsScreen from './products';
import HomeScreen from './home';
import ClientsScreen from './clients';

export default function SignedLayout() {
  const { colors } = useTheme();
  const Drawer = createDrawerNavigator();

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
        component={ClientsScreen}
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
