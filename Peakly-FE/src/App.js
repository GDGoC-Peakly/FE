import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { View } from 'react-native';
import SelectLogin from './screens/onBoardingScreens/SelectLogin';
import EmailLogin from './screens/onBoardingScreens/EmailLogin';
import EmptyScreen from './screens/onBoardingScreens/EmptyScreen';
import SignUp from './screens/onBoardingScreens/SignUp';
import OnboardingProfile from './screens/onBoardingScreens/OnboardingProfile';
import Terms from './screens/onBoardingScreens/Terms';
import ServiceTerms from './screens/onBoardingScreens/ServiceTerms';
import PrivacyPolicy from './screens/onBoardingScreens/PrivacyPolicy';
import AIDataConsent from './screens/onBoardingScreens/AIDataConsent';
import MarketingConsent from './screens/onBoardingScreens/MarketingConsent';
import ChronoType from './screens/onBoardingScreens/ChronoType';
import PeakTime from './screens/onBoardingScreens/PeakTime';
import Caffeine from './screens/onBoardingScreens/Caffeine';
import Noise from './screens/onBoardingScreens/Noise';
import Status from './screens/onBoardingScreens/Status';
import CustomTag from './screens/onBoardingScreens/CustomTag';
import CompleteScreen from './screens/onBoardingScreens/CompleteScreen';
import OnboardingStack from './navigations/OnboardingStack';

function App() {
  const [fontsLoaded] = useFonts({
    'Pretendard-Bold': require('../assets/fonts/Pretendard-Bold.otf'),
    'Pretendard-Medium': require('../assets/fonts/Pretendard-Medium.otf'),
    'Roboto-Medium': require('../assets/fonts/Roboto-Medium.ttf'),
  });

  if (!fontsLoaded) return null;

  return (
    <NavigationContainer>
      <OnboardingStack />
    </NavigationContainer>
  );
}

export default App;
