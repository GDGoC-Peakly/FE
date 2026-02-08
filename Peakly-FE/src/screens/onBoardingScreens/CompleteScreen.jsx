import { StyleSheet, Text, View, Platform } from 'react-native';
import Complete from '../../../assets/img/Onboarding/complete.svg';
import { colors } from '../../styles/colors';
import CustomButton from '../../components/CustomButton';
import Header from './components/Header';

const CompleteScreen = () => {
  return (
    <View style={styles.container}>
      <Header totalStep={7} currentStep={7} />
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>그럼 Peakly를{'\n'}시작해볼까요?</Text>
        <Text style={styles.subTitle}>선턱하신 설정은 나중에 변경할 수 있어요.</Text>
      </View>
      <Complete />
      <CustomButton style={styles.button} text={'완료'} />
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
