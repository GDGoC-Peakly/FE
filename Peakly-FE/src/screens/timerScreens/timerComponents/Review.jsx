import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import Star from '../../assets/img/TM/star.svg';
import EmptyStar from '../../assets/img/TM/emptyStar.svg';

const Review = ({ score = 0, onRate }) => {
  return (
    <View style={styles.container}>
      {[1, 2, 3, 4, 5].map((index) => (
        <Pressable key={index} onPress={() => onRate && onRate(index)}>
          {index <= score ? <Star width={40} height={40} /> : <EmptyStar width={40} height={40} />}
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
});

export default Review;
