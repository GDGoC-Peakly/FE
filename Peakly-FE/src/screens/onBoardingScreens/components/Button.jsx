import { StyleSheet, Pressable, Text } from 'react-native';
import { colors } from '../../../styles/colors';

const Button = ({ variant = true, title, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.buttonContainer, variant && { backgroundColor: colors.grayscale[200] }]}
    >
      <Text style={[styles.buttonText, variant && { color: colors.grayscale[500] }]}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    paddingHorizontal: 143,
    paddingVertical: 12,
    backgroundColor: colors.primary[500],
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 20,
    color: colors.grayscale[100],
  },
});

export default Button;
