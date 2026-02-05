import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import React, { useState } from 'react';
import { colors } from '../styles/colors';
import OffEye from '../../assets/img/Onboarding/offEye.svg';
import OnEye from '../../assets/img/Onboarding/onEye.svg';

const Input = ({ placeholder, inputType = 'text' }) => {
  const [showPassword, setShowPassword] = useState(false);

  const INPUT_CONFIGS = {
    email: {
      keyboardType: 'email-address',
      autoCapitalize: 'none',
      autoCorrect: false,
      autoComplete: 'email',
      textContentType: 'emailAddress',
    },
    password: {
      autoCapitalize: 'none',
      textContentType: 'none',
      autoComplete: 'off',
      importantForAutofill: 'no',
      autoCorrect: false,
    },
  };

  const config = INPUT_CONFIGS[inputType] || INPUT_CONFIGS.text;

  return (
    <TextInput
      mode="outlined"
      style={styles.inputContainer}
      placeholder={placeholder}
      placeholderTextColor={colors.grayscale[400]}
      textColor={colors.grayscale[100]}
      contentStyle={styles.placeholder}
      outlineColor="transparent"
      activeOutlineColor="transparent"
      cursorColor={colors.grayscale[100]}
      {...config}
      secureTextEntry={!showPassword}
      right={
        inputType === 'password' ? (
          <TextInput.Icon
            icon={({ size }) =>
              showPassword ? (
                <OnEye width={size} height={size} />
              ) : (
                <OffEye width={size} height={size} />
              )
            }
            onPress={() => setShowPassword(!showPassword)}
            forceTextInputFocus={false}
          />
        ) : null
      }
    />
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    height: 60,
    backgroundColor: colors.grayscale[800],
    borderRadius: 12,
  },
  placeholder: {
    fontSize: 12,
    fontFamily: 'Pretendard-Bold',
    fontWeight: 400,
  },
});
