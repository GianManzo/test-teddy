import { useTheme } from '@contexts/theme-provider';
import { IconProps } from './icon.interfaces';
import {
  Plus,
  AlertCircle,
  Bell,
  Home,
  User,
  Cat,
  Menu,
  User2,
  Pencil,
  Trash2,
} from '@tamagui/lucide-icons';
import { Pressable } from 'react-native';

export const Icon = ({
  color,
  name,
  size = 20,
  style,
  testID,
  onPress,
}: IconProps) => {
  const { colors } = useTheme();
  const props = { color: color ?? colors.fullColor, size, style, testID };
  const renderIcon = () => {
    switch (name) {
      case 'customers':
        return <User2 {...props} />;
      case 'edit':
        return <Pencil {...props} />;
      case 'delete':
        return <Trash2 {...props} />;
      case 'plus':
        return <Plus {...props} />;
      case 'menu':
        return <Menu {...props} />;
      case 'alert-circle':
        return <AlertCircle {...props} />;
      case 'bell':
        return <Bell {...props} />;
      case 'home':
        return <Home {...props} />;
      case 'user':
        return <User {...props} />;
      case 'cat':
        return <Cat {...props} />;
      default:
        return <AlertCircle {...props} />;
    }
  };

  return (
    <Pressable onPress={onPress} testID={testID} style={style}>
      {renderIcon()}
    </Pressable>
  );
};
