import { useState } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import Complete from '../../../assets/img/Onboarding/complete.svg';
import { colors } from '../../styles/colors';
import CustomButton from '../../components/CustomButton';
import Header from './components/Header';

// api
import { postInitialData } from '../../api/users';
import { useAuth } from '../../contexts/AuthContext';

const CompleteScreen = ({ route }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { completeOnboarding, logout } = useAuth();
  const { accumulatedData } = route.params || {};

  const handleComplete = async () => {
    if (isLoading) return;

    console.log('📦 [DEBUG] 온보딩 최종 전송 데이터 (accumulatedData):');
    console.log(JSON.stringify(accumulatedData, null, 2));

    try {
      setIsLoading(true);
      await postInitialData(accumulatedData);
      await completeOnboarding(accumulatedData);
    } catch (error) {
      if (error.response?.status === 409) {
        await completeOnboarding(accumulatedData);
      } else {
        console.error('온보딩 최종 저장 실패:', error);
        Alert.alert('알림', '데이터 저장 중 오류가 발생했습니다. 다시 시도해 주세요.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header totalStep={7} currentStep={7} />
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>그럼 Peakly를{'\n'}시작해볼까요?</Text>
        <Text style={styles.subTitle}>선턱하신 설정은 나중에 변경할 수 있어요.</Text>
      </View>
      <Complete />
      <CustomButton style={styles.button} text={'완료'} onPress={handleComplete} />
    </View>
  );
};
export default CompleteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grayscale[100],
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  titleWrapper: {
    marginTop: 50,
    alignItems: 'center',
    gap: 8,
    marginBottom: 120,
  },
  title: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 28,
    textAlign: 'center',
  },
  subTitle: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 16,
    color: colors.primary[500],
  },
  button: {
    position: 'absolute',
    bottom: 50,
  },
});
