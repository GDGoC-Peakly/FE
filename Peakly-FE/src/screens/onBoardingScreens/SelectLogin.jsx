import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../styles/colors';
import KakaoLogo from '../../../assets/img/Onboarding/kakaoLogo.svg';
import GoogleLogo from '../../../assets/img/Onboarding/googleLogo.svg';
import OnboardingButton from '../../components/OnboardingButton';
import Logo from '../../../assets/img/Onboarding/logo.svg';
import Email from '../../../assets/img/Onboarding/email.svg';

const SelectLogin = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Logo width={176} height={64} style={styles.logo} />
      <Pressable style={styles.kakaoContainer}>
        <KakaoLogo width={18.5} height={18.5} style={styles.svg} />
        <Text style={styles.kakaoText}>카카오 로그인</Text>
      </Pressable>
      <Pressable style={styles.googleContainer}>
        <GoogleLogo width={18.5} height={18.5} style={styles.svg} />
        <Text style={styles.googleText}>구글 계정으로 로그인</Text>
      </Pressable>
      <Pressable style={styles.emailContainer} onPress={() => navigation.navigate('EmailLogin')}>
        <Email width={18.5} height={18.5} style={styles.svg} />
        <Text style={styles.emailText}>이메일로 로그인</Text>
      </Pressable>
      <View style={styles.bottomButtonContainer}>
        <Pressable onPress={() => navigation.navigate('Terms')}>
          <Text style={styles.signUpText}>회원가입</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SelectLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grayscale[900],
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    gap: 10,
  },
  logo: {
    position: 'absolute',
    top: 140,
  },
  kakaoContainer: {
    flexDirection: 'row',
    backgroundColor: '#FEE500',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    gap: 16,
    height: 45,
    width: '100%',
  },
  kakaoText: {
    fontSize: 15,
    color: 'rgba(0,0,0,0.85)',
    fontWeight: 600,
  },
  googleContainer: {
    flexDirection: 'row',
    backgroundColor: '#Ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    gap: 16,
    height: 45,
    width: '100%',
  },
  googleText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    color: '#1F1F1F',
    fontWeight: 20,
  },
  emailContainer: {
    flexDirection: 'row',
    backgroundColor: colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    gap: 16,
    height: 45,
    width: '100%',
  },
  emailText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 15,
    color: colors.grayscale[100],
  },
  svg: {
    position: 'absolute',
    left: 30,
  },
  bottomButtonContainer: {
    flexDirection: 'row',
    marginTop: 40,
    marginBottom: 150,
  },
  signUpText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 12,
    color: colors.grayscale[100],
    textDecorationLine: 'underline',
  },
});
