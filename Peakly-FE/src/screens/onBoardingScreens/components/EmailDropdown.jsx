import { Pressable, StyleSheet, Text, View } from 'react-native';
import ArrowDown from '../../../../assets/img/Onboarding/arrowDown.svg';
import { colors } from '../../../styles/colors';
import { useState } from 'react';
import Input from '../../../components/Input';
import { TextInput } from 'react-native-paper';

const EmailDropdown = ({ value, onValueChange, style }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDirect, setIsDirect] = useState(false);

  const DOMAINS = ['@gmail.com', '@naver.com', '@kakao.com', '@icloud.com', '직접입력'];

  const handleReset = () => {
    setIsDirect(false);
    onValueChange('');
  };

  const inputProps = {
    mode: 'outlined',
    outlineColor: colors.grayscale[300],
    activeOutlineColor: colors.grayscale[300],
    theme: { roundness: 12 },
    cursorColor: colors.grayscale[1000],
    secureTextEntry: false,
    right: (
      <TextInput.Icon
        icon={() => <Text style={styles.x}>×</Text>}
        forceTextInputFocus={false}
        onPress={handleReset}
      />
    ),
  };

  const handleSelect = (item) => {
    setIsOpen(false);
    if (item === '직접입력') {
      setIsDirect(true);
      onValueChange('');
    } else {
      setIsDirect(false);
      onValueChange(item);
    }
  };

  return (
    <View style={{ zIndex: 2000 }}>
      <View>
        {isDirect ? (
          <Input
            placeholder={'직접 입력'}
            style={[styles.input, style]}
            {...inputProps}
            value={value}
            onChangeText={onValueChange}
            props={inputProps}
          />
        ) : (
          <Pressable style={[styles.selectBox, style]} onPress={() => setIsOpen(!isOpen)}>
            <Text style={[styles.text, !value && { color: colors.grayscale[400] }]}>
              {value || '선택'}
            </Text>
            <ArrowDown />
          </Pressable>
        )}
      </View>
      {isOpen && !isDirect && (
        <View style={styles.dropdownListContainer}>
          {DOMAINS.map((domain, idx) => {
            const isSelected = value === domain;
            return (
              <Pressable key={idx} style={styles.dropdownItem} onPress={() => handleSelect(domain)}>
                <Text style={[styles.disabledText, isSelected && styles.text]}>{domain}</Text>
              </Pressable>
            );
          })}
        </View>
      )}
    </View>
  );
};

export default EmailDropdown;

const styles = StyleSheet.create({
  selectBox: {
    width: 144,
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderColor: colors.grayscale[300],
    borderWidth: 1,
    paddingHorizontal: 12,
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  dropdownListContainer: {
    position: 'absolute',
    top: 64,
    width: 144,
    backgroundColor: 'white',
    borderRadius: 12,
    borderColor: colors.grayscale[300],
    borderWidth: 1,
    overflow: 'hidden',
    zIndex: 3000,
  },
  dropdownItem: {
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayscale[100],
  },
  text: {
    fontFamily: 'Pretendard-Bold',
    color: colors.grayscale[500],
    fontWeight: '500',
  },
  disabledText: {
    fontFamily: 'Pretendard-Bold',
    color: colors.grayscale[1000],
    fontWeight: '500',
  },
  input: {
    width: 144,
    height: 54,
    backgroundColor: colors.grayscale[100],
  },
  x: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 15,
    color: colors.grayscale[500],
    marginTop: 2,
  },
});
