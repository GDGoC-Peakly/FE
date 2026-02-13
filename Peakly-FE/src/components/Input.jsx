import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useState } from 'react';
import { colors } from '../styles/colors';
import OffEye from '../../assets/img/Onboarding/offEye.svg';
import OnEye from '../../assets/img/Onboarding/onEye.svg';

const Input = ({
  placeholder,
  inputType = 'text',
  style,
  props,
  right,
  value,
  onChangeText,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextInput
      mode="outlined"
      style={[styles.inputContainer, style]}
      placeholder={placeholder}
      placeholderTextColor={colors.grayscale[400]}
      textColor={colors.grayscale[1000]}
      contentStyle={styles.placeholder}
      outlineColor="transparent"
      activeOutlineColor="transparent"
      secureTextEntry={inputType === 'password' && !showPassword}
      value={value}
      onChangeText={onChangeText}
      {...props}
      {...rest}
      right={
        right ? (
          right
        ) : inputType === 'password' ? (
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
  },
  placeholder: {
    fontSize: 12,
    fontFamily: 'Pretendard-Medium',
  },
});
