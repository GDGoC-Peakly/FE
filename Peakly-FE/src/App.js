import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { View } from 'react-native';
import TM04 from './TM/TM04';
import TM03 from './TM/TM03';
import DisturbCheck from './TM/DisturbCheck';

function App() {
  const [fontsLoaded] = useFonts({
    'Pretendard-Bold': require('../assets/fonts/Pretendard-Bold.otf'),
    'Pretendard-Medium': require('../assets/fonts/Pretendard-Medium.otf'),
  });

  if (!fontsLoaded) return null;

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <DisturbCheck />
    </View>
  );
}

export default App;
