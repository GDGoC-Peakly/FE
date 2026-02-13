import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainStack from './MainStack';
import AuthStack from './AuthStack';
import EmptyScreen from '../screens/onBoardingScreens/EmptyScreen';

import { useAuth } from '../contexts/AuthContext';

const AppNavigator = () => {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return <EmptyScreen />;
  }

  return <NavigationContainer>{!isLoggedIn ? <AuthStack /> : <MainStack />}</NavigationContainer>;
};

export default AppNavigator;
