import { createStackNavigator } from '@react-navigation/stack';

// 스크린 import
import SelectLogin from '../screens/onBoardingScreens/SelectLogin';
import EmailLogin from '../screens/onBoardingScreens/EmailLogin';
import EmptyScreen from '../screens/onBoardingScreens/EmptyScreen';
import SignUp from '../screens/onBoardingScreens/SignUp';
import OnboardingProfile from '../screens/onBoardingScreens/OnboardingProfile';
import Terms from '../screens/onBoardingScreens/Terms';
import ServiceTerms from '../screens/onBoardingScreens/ServiceTerms';
import PrivacyPolicy from '../screens/onBoardingScreens/PrivacyPolicy';
import AIDataConsent from '../screens/onBoardingScreens/AIDataConsent';
import MarketingConsent from '../screens/onBoardingScreens/MarketingConsent';
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
      initialRouteName="SelectLogin"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SelectLogin" component={SelectLogin} />
      <Stack.Screen name="EmailLogin" component={EmailLogin} />
      <Stack.Screen name="EmptyScreen" component={EmptyScreen} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="OnboardingProfile" component={OnboardingProfile} />
      <Stack.Screen name="Terms" component={Terms} />
      <Stack.Screen name="ServiceTerms" component={ServiceTerms} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="AIDataConsent" component={AIDataConsent} />
      <Stack.Screen name="MarketingConsent" component={MarketingConsent} />
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
