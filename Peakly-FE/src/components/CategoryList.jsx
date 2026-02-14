import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles/colors';

const CategoryList = ({ categories, selectedCategory, onRemoveCategory }) => {
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
        keyboardShouldPersistTaps="handled"
      >
        {categories.length === 0 ? (
          <Text style={styles.emptyText}>
            '{selectedCategory}' 분류에{'\n'}추가된 카테고리가 없습니다.
          </Text>
        ) : (
          categories.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.categoryItem}
              onPress={() => onRemoveCategory(item.id)}
            >
              <Text style={styles.categoryContent}>{item.content}</Text>
              <Ionicons
                name="close"
                size={12}
                color={colors.primary[500]}
                style={styles.closeIcon}
              />
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 250,
    borderWidth: 1,
    borderColor: colors.grayscale[300],
    borderRadius: 16,
    backgroundColor: colors.grayscale[100],
    marginBottom: 20,
    overflow: 'hidden',
    zIndex: 1,
    elevation: 1,
  },
  scrollContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    padding: 16,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary[50],
    padding: 13,
    borderRadius: 12,
    borderColor: colors.primary[500],
    borderWidth: 1,
  },
  categoryType: {
    fontSize: 16,
    fontFamily: 'Pretendard-Bold',
    color: colors.primary[500],
  },
  divider: {
    width: 1,
    height: 10,
    backgroundColor: colors.grayscale[400],
    marginHorizontal: 8,
  },
  categoryContent: {
    fontSize: 14,
    fontFamily: 'Pretendard-Medium',
    color: colors.primary[500],
  },
  closeIcon: {
    marginLeft: 10,
  },
  emptyText: {
    color: colors.grayscale[400],
    fontSize: 14,
    fontFamily: 'Pretendard-Medium',
    marginTop: 20,
    width: '100%',
    textAlign: 'center',
    lineHeight: 20,
  },
});
