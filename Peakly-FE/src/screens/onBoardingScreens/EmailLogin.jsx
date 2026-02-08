import { StyleSheet, Text, View } from 'react-native';
import Input from '../../components/Input';
import { colors } from '../../styles/colors';
import CustomButton from '../../components/CustomButton';
import OnboardingButton from '../../components/OnboardingButton';
import Logo from '../../../assets/img/Onboarding/logo.svg';

const EmailLogin = () => {
  return (
    <View style={styles.container}>
      <Logo width={176} height={64} style={styles.logo} />
      <Input placeholder={'아이디(이메일)'} inputType="email" />
      <Input placeholder={'비밀번호'} inputType="password" />
      <CustomButton text={'로그인'} style={styles.button} />
      <View style={styles.bottomButtonContainer}>
        <OnboardingButton text={'아이디 찾기'} />
        <View style={styles.line} />
        <OnboardingButton text={'비밀번호 찾기'} />
        <OnboardingButton text={'회원가입'} style={styles.signUp} />
      </View>
    </View>
  );
};

export default EmailLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grayscale[900],
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
  },
  logo: {
    position: 'absolute',
    top: 150,
  },
  button: {
    backgroundColor: colors.primary[500],
    borderRadius: 12,
    marginTop: 30,
  },
  line: {
    height: 18.5,
    borderRightWidth: 1,
    borderColor: colors.grayscale[100],
    marginHorizontal: 20,
  },
  bottomButtonContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    width: '100%',
  },
  signUp: {
    marginLeft: 'auto',
    alignSelf: 'flex-end',
  },
});
