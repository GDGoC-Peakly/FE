import { Pressable, StyleSheet, Text, View, Alert } from 'react-native';
import React, { useState } from 'react';
import { DisturbConfig } from '../constants/reasonData';
import { colors } from '../styles/colors';

const DisturbCheckScreen = () => {
  const sessionId = 10;

  const [selectedIds, setSelectedIds] = useState([]);

  const handleToggle = (id) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleSubmit = () => {
    if (selectedIds.length === 0) {
      Alert.alert('알림', '방해 요인을 1개 이상 선택해주세요.');
      return;
    }

    const requestBody = {
      disruptionReasonIds: selectedIds,
    };
  };

  const categoryKeys = Object.keys(DisturbConfig);

  return (
    <View style={styles.buttonContainer}>
      {categoryKeys.map((key) => {
        const item = DisturbConfig[key];
        const isSelected = selectedIds.includes(item.id);
        const IconComponent = isSelected ? item.IconOn : item.IconOff;
        return (
          <Pressable
            key={item.id}
            style={[styles.button, isSelected && styles.selectedButton]}
            onPress={() => handleToggle(item.id)}
          >
            <IconComponent width={item.width} height={item.height} />
            <Text style={[styles.buttonText, isSelected && styles.selectedButtonText]}>
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default DisturbCheckScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: colors.grayscale[200],
    paddingVertical: 10,
    paddingHorizontal: 34 /*우선 Figma에 맞춰서 제작 하였으나, 피그마의 좌우 패딩값은 다 달라서 디자이너와 소통 후 패당값 확정 */,
    borderRadius: 50,
    gap: 8,
  },
  selectedButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: colors.primary[500],
    paddingVertical: 10,
    paddingHorizontal: 34,
    borderRadius: 50,
    gap: 8,
  },
  buttonText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    fontFamily: 'Pretendard-Bold',
  },
  selectedButtonText: {
    color: colors.grayscale[100],
    fontWeight: 'bold',
  },
});
