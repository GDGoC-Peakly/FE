import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { colors } from '../../styles/colors';
import Input from '../../components/Input';
import CustomButton from '../../components/CustomButton';
import DefaultHeader from './components/DefaultHeader';
import EmailDropdown from './components/EmailDropdown';

// api
import { checkEmail, sendVerifyEmail, verifyEmail, signup, login } from '../../api/auth';

const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;

const STATUS_MESSAGES = {
  email: {
    already: { text: '이미 가입된 아이디입니다.', color: colors.grayscale[1000] },
    possible: { text: '사용 가능한 아이디입니다.', color: colors.primary[500] },
    checking: { text: '확인 중...', color: colors.grayscale[500] },
    invalid: { text: '올바른 이메일 형식이 아닙니다.', color: colors.grayscale[1000] },
    error: { text: '확인 중 오류가 발생했습니다.', color: colors.grayscale[1000] },
  },
  password: {
    ready: { text: '사용 가능한 비밀번호입니다.', color: colors.primary[500] },
    already: { text: '영문, 숫자를 포함해 8자~20자로 입력해주세요.', color: colors.grayscale[500] },
  },
  confirm: {
    same: { text: '비밀번호가 일치합니다.', color: colors.primary[500] },
    diffirent: { text: '비밀번호가 일치하지 않습니다.', color: colors.grayscale[1000] },
  },
};

const StatusMessage = ({ status, type }) => {
  if (!status) return null;
  const message = STATUS_MESSAGES[type][status];
  if (!message) return null;

  return <Text style={[styles.statusText, { color: message.color }]}>{message.text}</Text>;
};

const createInputProps = (borderColor) => ({
  mode: 'outlined',
  outlineColor: colors.grayscale[300],
  activeOutlineColor: borderColor,
  theme: {
    roundness: 12,
    colors: { primary: borderColor },
  },
  cursorColor: colors.grayscale[1000],
});

const getBorderColor = (status, successValue, errorValue) => {
  if (status === successValue) return colors.primary[500];
  if (status === errorValue) return colors.grayscale[1000];
  return colors.grayscale[300];
};

const SignUp = ({ navigation }) => {
  const [emailId, setEmailId] = useState('');
  const [emailDomain, setEmailDomain] = useState('');
  const [emailStatus, setEmailStatus] = useState(null);
  const [password, setPassword] = useState('');
  const [pwStatus, setPwStatus] = useState(null);
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isSame, setIsSame] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const isAllValid = emailStatus === 'possible' && pwStatus === 'ready' && isSame === 'same';

  // 이메일 중복 확인
  useEffect(() => {
    if (emailId.trim().length > 0 && emailDomain.trim().length > 0) {
      const fullEmail = emailId + emailDomain;
      setEmailStatus('checking');
      if (!fullEmail.includes('@')) {
        setEmailStatus('invalid');
        return;
      }

      const debounceTimer = setTimeout(async () => {
        try {
          const response = await checkEmail(fullEmail);
          if (response?.isSuccess) {
            const { isDuplicated } = response.result;
            setEmailStatus(isDuplicated ? 'already' : 'possible');
          } else {
            console.error('이메일 확인 실패:', response?.message || 'Unknown error');
            setEmailStatus('error');
          }
        } catch (error) {
          console.error('중복 확인 에러: ', error);
          setEmailStatus(null);
        }
      }, 500);
      return () => clearTimeout(debounceTimer);
    } else {
      setEmailStatus(null);
    }
  }, [emailId, emailDomain]);

  useEffect(() => {
    if (password.length > 0) {
      setPwStatus(PASSWORD_REGEX.test(password) ? 'ready' : 'already');
    } else {
      setPwStatus(null);
    }

    if (passwordConfirm.length > 0) {
      setIsSame(password === passwordConfirm ? 'same' : 'diffirent');
    } else {
      setIsSame(null);
    }
  }, [password, passwordConfirm]);

  const handleSignUp = async () => {
    if (!isAllValid || isLoading) {
      if (!isAllValid) Alert.alert('확인 필요', '모든 입력란을 올바르게 채워주세요.');
      return;
    }
    const fullEmail = emailId + emailDomain;
    setIsLoading(true);

    try {
      const signupResponse = await signup(fullEmail, password);

      if (signupResponse?.isSuccess) {
        const loginResponse = await login(fullEmail, password);

        if (loginResponse?.isSuccess) {
          Alert.alert('환영합니다!', '회원가입이 완료되었습니다.');
          navigation.navigate('OnboardingProfile');
        }
      } else {
        Alert.alert('가입 실패', signupResponse.message || '다시 시도해주세요.');
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;

        if (status === 403) {
          Alert.alert('인증 필요', '이메일 인증이 필요합니다.');
        } else {
          Alert.alert('가입 실패', data?.message || '가입 처리 중 오류가 발생했습니다.');
        }
      } else {
        Alert.alert('네트워크 오류', '서버와의 통신이 원활하지 않습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 이메일 인증 토큰 딥링크 발송 로직
  const handleSendEmail = async () => {
    const fullEmail = emailId + emailDomain;
    if (emailStatus === 'possible') {
      try {
        const response = await sendVerifyEmail(fullEmail);

        if (response?.isSuccess) {
          Alert.alert('인증메일 발송 완료', `${fullEmail}으로 인증메일이 발송되었습니다.`);
        } else {
          alert(response?.message || '메일 발송 실패');
        }
      } catch (error) {
        console.error('메일 발송 에러', error);
        alert('네트워크 오류가 발생했습니다.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <DefaultHeader title={'회원가입'} style={styles.header} onPress={() => navigation.goBack()} />
      <View style={styles.contentWrapper}>
        <Text style={styles.title}>아이디(이메일)</Text>
        <StatusMessage status={emailStatus} type="email" />
        <View style={styles.inputWrapper}>
          <Input
            props={createInputProps(getBorderColor(emailStatus, 'possible', 'already'))}
            style={styles.input}
            value={emailId}
            onChangeText={setEmailId}
          />
          <EmailDropdown
            value={emailDomain}
            onValueChange={setEmailDomain}
            style={{ marginLeft: 12 }}
          />
        </View>
        <CustomButton
          text={'인증'}
          style={[emailStatus !== 'possible' ? styles.disabledButton : styles.activeButton]}
          disabled={emailStatus !== 'possible'}
          onPress={handleSendEmail}
        />
      </View>
      <View style={styles.contentWrapper}>
        <Text style={styles.title}>비밀번호</Text>
        <StatusMessage status={pwStatus} type="password" />
        <Input
          inputType="password"
          props={createInputProps(getBorderColor(pwStatus, 'ready', 'already'))}
          style={styles.password}
          onChangeText={setPassword}
          value={password}
        />
      </View>
      <View style={styles.contentWrapper}>
        <Text style={styles.title}>비밀번호 확인</Text>
        <StatusMessage status={isSame} type="confirm" />
        <Input
          inputType="password"
          props={createInputProps(getBorderColor(isSame, 'same', 'diffirent'))}
          style={styles.password}
          value={passwordConfirm}
          onChangeText={setPasswordConfirm}
        />
      </View>
      <CustomButton
        text={'다음'}
        style={[styles.nextButton, isAllValid ? styles.activeButton : styles.disabledButton]}
        disabled={!isAllValid}
        onPress={handleSignUp}
      />
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 20,
    marginBottom: 12,
  },
  contentWrapper: {
    marginBottom: 36,
    position: 'relative',
  },
  inputWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  input: {
    flex: 1,
    backgroundColor: colors.grayscale[100],
    height: 54,
  },
  password: {
    width: '100%',
    backgroundColor: colors.grayscale[100],
    height: 54,
  },
  disabledButton: {
    backgroundColor: colors.grayscale[300],
  },
  activeButton: {
    backgroundColor: colors.primary[500],
  },
  nextButton: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    alignSelf: 'center',
  },
  statusText: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 12,
    position: 'absolute',
    right: 0,
    top: 5,
  },
});
