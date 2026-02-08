import { StyleSheet, Text, Pressable } from 'react-native';
import { colors } from '../styles/colors';

const CustomButton = ({ style, text, onPress, textStyle, disabled }) => {
  return (
    <Pressable style={[styles.buttonContainer, style]} onPress={onPress} disabled={disabled}>
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    backgroundColor: colors.grayscale[1000],
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  text: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 20,
    color: colors.grayscale[100],
  },
});
