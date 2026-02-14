import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { colors } from '../../styles/colors';
import CustomButton from '../../components/CustomButton';
import Header from './components/Header';
import CategoryCreate from '../../components/CategoryCreate';

const CustomTag = () => {
  const [tags, setTags] = useState([]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Header totalStep={7} currentStep={6} />

        <View style={styles.titleWrapper}>
          <Text style={styles.title}>커스텀 태그</Text>
          <Text style={styles.subTitle}>자유롭게 커스텀 태그를 만들어보세요.</Text>
        </View>
        <CategoryCreate categories={tags} setCategories={setTags} />

        <CustomButton text={'다음'} style={styles.button} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CustomTag;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grayscale[100],
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  titleWrapper: {
    alignItems: 'center',
    gap: 8,
    marginBottom: 135,
    marginTop: 50,
  },
  title: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 28,
  },
  subTitle: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 16,
    color: colors.primary[500],
  },
  button: {
    position: 'absolute',
    bottom: 50,
  },
});
