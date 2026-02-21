import { Alert, StyleSheet, View } from 'react-native';
import { useState } from 'react';
import Input from '../../components/Input';
import { colors } from '../../styles/colors';
import CustomButton from '../../components/CustomButton';
import OnboardingButton from '../../components/OnboardingButton';
import DefaultHeader from './components/DefaultHeader';

// api
import { login as loginApi } from '../../api/auth';
import { useAuth } from '../../contexts/AuthContext';

const emailConfig = {
  keyboardType: 'email-address',
  autoCapitalize: 'none',
  autoCorrect: false,
  autoComplete: 'email',
  textContentType: 'emailAddress',
  textColor: colors.grayscale[100],
  cursorColor: colors.grayscale[100],
  selectionColor: colors.grayscale[100],
};

const passwordConfig = {
  autoCapitalize: 'none',
  textContentType: 'none',
  autoComplete: 'off',
  importantForAutofill: 'no',
  autoCorrect: false,
  textColor: colors.grayscale[100],
  cursorColor: colors.grayscale[100],
  selectionColor: colors.grayscale[100],
};

const EmailLogin = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isAllValid = email.includes('@') && password.length > 0;

  const { login: authLogin } = useAuth();

  const handleLogin = async () => {
    if (!isAllValid || isLoading) return;

    setIsLoading(true);
    try {
      const data = await loginApi(email, password);
      await authLogin(data.accessToken, data.refreshToken);
      navigation.replace('MainStack');
    } catch (error) {
      console.error('Login Error', error);
      if (error.response) {
        const { status, data } = error.response;
        if (status === 401) {
          Alert.alert('로그인 실패', '아이디 또는 비밀번호가 일치하지 않습니다.');
        } else if (status === 403) {
          Alert.alert('로그인 제한', data?.message || '비활성화된 계정입니다.');
        } else {
          Alert.alert('오류', data?.message || '로그인 중 에러가 발생했습니다.');
        }
      } else {
        Alert.alert('네트워크 오류', '서버와의 통신이 원할하지 않습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <DefaultHeader
        title={'로그인'}
        onPress={() => navigation.goBack()}
        white={true}
        style={styles.header}
      />
      <Input
        placeholder={'아이디(이메일)'}
        inputType="email"
        value={email}
        onChangeText={setEmail}
        props={emailConfig}
        {...emailConfig}
      />
      <Input
        placeholder={'비밀번호'}
        value={password}
        onChangeText={setPassword}
        inputType="password"
        props={passwordConfig}
        {...passwordConfig}
      />
      <CustomButton
        text={'로그인'}
        disabled={!isAllValid || isLoading}
        style={isAllValid ? styles.activeButton : styles.disabledButton}
        onPress={handleLogin}
      />
      <View style={styles.bottomButtonContainer}>
        <OnboardingButton text={'비밀번호를 잊으셨나요?'} />
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
    alignItems: 'center',
    gap: 15,
  },
  header: {
    marginBottom: 80,
  },
  activeButtonbutton: {
    backgroundColor: colors.primary[500],
    borderRadius: 12,
    marginTop: 30,
  },
  disabledButton: {
    backgroundColor: colors.grayscale[600],
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
    alignItems: 'center',
    marginTop: 50,
  },
  signUp: {
    marginLeft: 'auto',
    alignSelf: 'flex-end',
  },
});
