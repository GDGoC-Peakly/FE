import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainStack from './MainStack';
import AuthStack from './AuthStack';
import OnboardingStack from './OnboardingStack';
import EmptyScreen from '../screens/onBoardingScreens/EmptyScreen';

import { useAuth } from '../contexts/AuthContext';

const AppNavigator = () => {
  const { isLoggedIn, isLoading, hasCompleteOnboarding } = useAuth();

  if (isLoading) {
    return <EmptyScreen />;
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? hasCompleteOnboarding ? <MainStack /> : <OnboardingStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
