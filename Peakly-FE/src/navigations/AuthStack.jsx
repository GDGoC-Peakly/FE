import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SelectLogin from '../screens/onBoardingScreens/SelectLogin';
import EmailLogin from '../screens/onBoardingScreens/EmailLogin';
import SignUp from '../screens/onBoardingScreens/SignUp';
import EmptyScreen from '../screens/onBoardingScreens/EmptyScreen';
import Terms from '../screens/onBoardingScreens/Terms';
import ServiceTerms from '../screens/onBoardingScreens/ServiceTerms';
import PrivacyPolicy from '../screens/onBoardingScreens/PrivacyPolicy';
import AIDataConsent from '../screens/onBoardingScreens/AIDataConsent';
import MarketingConsent from '../screens/onBoardingScreens/MarketingConsent';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="SelectLogin"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SelectLogin" component={SelectLogin} />
      <Stack.Screen name="EmailLogin" component={EmailLogin} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="EmptyScreen" component={EmptyScreen} />
      <Stack.Screen name="Terms" component={Terms} />
      <Stack.Screen name="ServiceTerms" component={ServiceTerms} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="AIDataConsent" component={AIDataConsent} />
      <Stack.Screen name="MarketingConsent" component={MarketingConsent} />
    </Stack.Navigator>
  );
};

export default AuthStack;
