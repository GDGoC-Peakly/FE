import { StyleSheet, TextInput, View } from 'react-native';
import { colors } from '../styles/colors';

const CategoryInput = ({ value, onChangeText, onSubmit, selectedCategory }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={`${selectedCategory} 카테고리 입력 (최대 5개)`}
        placeholderTextColor={colors.grayscale[400]}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        returnKeyType="done"
      />
    </View>
  );
};

export default CategoryInput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderColor: colors.grayscale[300],
    borderRadius: 12,
    paddingHorizontal: 16,
    justifyContent: 'center',
    backgroundColor: colors.grayscale[100],
    zIndex: 10,
  },
  input: {
    fontSize: 14,
    fontFamily: 'Pretendard-Medium',
    padding: 0,
    color: colors.grayscale[900],
    height: '100%',
  },
});
