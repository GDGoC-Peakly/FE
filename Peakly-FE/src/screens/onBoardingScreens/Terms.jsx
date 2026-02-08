import { StyleSheet, Text, View, Pressable } from 'react-native';
import CheckBox from '../../components/CheckBox';
import { colors } from '../../styles/colors';
import ArrowRight from '../../../assets/img/Onboarding/arrowRight.svg';
import CustomButton from '../../components/CustomButton';

const Terms = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>서비스 이용약관에{'\n'}동의해주세요</Text>
      <View style={styles.termsAllBox}>
        <CheckBox />
        <Text style={styles.allAllow}>약관 전체 동의</Text>
      </View>
      <View style={styles.termsContainer}>
        <View style={styles.termsBox}>
          <CheckBox />
          <Text style={styles.termsDescription}>[필수] 만 14세 이상이며, 이를 동의합니다.</Text>
        </View>
        <View style={styles.termsBox}>
          <CheckBox />
          <Text style={styles.termsDescription}>[필수] 서비스 이용약관 동의</Text>
          <Pressable style={styles.svg}>
            <ArrowRight />
          </Pressable>
        </View>
        <View style={styles.termsBox}>
          <CheckBox />
          <Text style={styles.termsDescription}>[필수] 개인정보 처리방침 동의</Text>
          <Pressable style={styles.svg}>
            <ArrowRight />
          </Pressable>
        </View>
        <View style={styles.termsBox}>
          <CheckBox />
          <Text style={styles.termsDescription}>[필수] 데이터 분석 및 AI 학습 활용 동의</Text>
          <Pressable style={styles.svg}>
            <ArrowRight />
          </Pressable>
        </View>
        <View style={styles.termsBox}>
          <CheckBox />
          <Text style={styles.termsDescription}>[선택] 마케팅 정보 수신 동의</Text>
          <Pressable style={styles.svg}>
            <ArrowRight />
          </Pressable>
        </View>
      </View>
      <CustomButton style={styles.button} text={'시작'} />
    </View>
  );
};

export default Terms;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 125,
    backgroundColor: colors.grayscale[100],
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 28,
    color: '#000000',
    textAlign: 'center',
    marginBottom: 96,
  },
  termsAllBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 17,
    paddingLeft: 20,
    gap: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.grayscale[300],
    width: '85%',
    marginBottom: 30,
  },
  allAllow: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 16,
  },
  termsDescription: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 14,
  },
  termsBox: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  termsContainer: {
    gap: 16,
  },
  svg: {
    marginLeft: 'auto',
  },
  button: {
    backgroundColor: colors.primary[500],
    position: 'absolute',
    bottom: 50,
  },
});
