import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingProfile from '../screens/onBoardingScreens/OnboardingProfile';
import ChronoType from '../screens/onBoardingScreens/ChronoType';
import PeakTime from '../screens/onBoardingScreens/PeakTime';
import Caffeine from '../screens/onBoardingScreens/Caffeine';
import Noise from '../screens/onBoardingScreens/Noise';
import Status from '../screens/onBoardingScreens/Status';
import CustomTag from '../screens/onBoardingScreens/CustomTag';
import CompleteScreen from '../screens/onBoardingScreens/CompleteScreen';

const Stack = createStackNavigator();

const OnboardingStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="OnboardingProfile"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="OnboardingProfile" component={OnboardingProfile} />
      <Stack.Screen name="ChronoType" component={ChronoType} />
      <Stack.Screen name="PeakTime" component={PeakTime} />
      <Stack.Screen name="Caffeine" component={Caffeine} />
      <Stack.Screen name="Noise" component={Noise} />
      <Stack.Screen name="Status" component={Status} />
      <Stack.Screen name="CustomTag" component={CustomTag} />
      <Stack.Screen name="CompleteScreen" component={CompleteScreen} />
    </Stack.Navigator>
  );
};

export default OnboardingStack;
