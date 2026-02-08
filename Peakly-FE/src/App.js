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
import MarketingConsent from './screens/onBoardingScreens/MarketingContsent';
import ChronoType from './screens/onBoardingScreens/ChronoType';
import PeakTime from './screens/onBoardingScreens/PeakTime';
import Caffaine from './screens/onBoardingScreens/Caffaine';
import Noise from './screens/onBoardingScreens/Noise';

function App() {
  const [fontsLoaded] = useFonts({
    'Pretendard-Bold': require('../assets/fonts/Pretendard-Bold.otf'),
    'Pretendard-Medium': require('../assets/fonts/Pretendard-Medium.otf'),
    'Roboto-Medium': require('../assets/fonts/Roboto-Medium.ttf'),
  });

  if (!fontsLoaded) return null;

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="light" />
      <Noise />
    </View>
  );
}

export default App;
