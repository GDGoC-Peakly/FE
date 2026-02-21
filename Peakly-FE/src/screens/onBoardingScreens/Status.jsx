import { useState } from 'react';
import { StyleSheet, Text, View, Pressable, useWindowDimensions, Alert } from 'react-native';
import { colors } from '../../styles/colors';
import Student from '../../../assets/img/Onboarding/student.svg';
import NoJob from '../../../assets/img/Onboarding/noJob.svg';
import WhiteMan from '../../../assets/img/Onboarding/whiteMan.svg';
import Others from '../../../assets/img/Onboarding/others.svg';
import CustomButton from '../../components/CustomButton';
import Header from './components/Header';

const Status = ({ navigation, route }) => {
  const { width } = useWindowDimensions();
  const calWidth = width - 40;
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { accumulatedData } = route.params || {};

  const statusOptions = [
    { id: 'student', Icon: Student, label: '학생' },
    { id: 'noJob', Icon: NoJob, label: '취준생' },
    { id: 'whiteMan', Icon: WhiteMan, label: '직장인' },
    { id: 'others', Icon: Others, label: '기타' },
  ];

  const handleNext = async () => {
    if (!selectedStatus) {
      Alert.alert('알림', '현재 상태를 선택해주세요.');
      return;
    }

    if (isLoading) return;
    setIsLoading(true);

    const jobMapping = {
      student: 'STUDENT',
      noJob: 'JOB_SEEKER',
      whiteMan: 'OFFICE_WORKER',
      others: 'ETC',
    };
    const nextAccumulatedData = {
      ...accumulatedData,
      job: jobMapping[selectedStatus],
    };
    navigation.navigate('CustomTag', {
      accumulatedData: nextAccumulatedData,
    });
  };

  const renderButton = (item) => {
    const isSelected = selectedStatus === item.id;
    return (
      <Pressable
        key={item.id}
        onPress={() => setSelectedStatus(item.id)}
        style={[styles.button, isSelected ? styles.selectedButton : styles.unselectedButton]}
      >
        <item.Icon />
        <Text style={[styles.label, isSelected ? styles.selectedText : styles.unselectedText]}>
          {item.label}
        </Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <Header totalStep={7} currentStep={5} onPress={() => navigation.goBack()} />
      <Text style={styles.title}>현재는{'\n'}어떤 상태이신가요?</Text>
      <View style={[styles.buttonContainer, { height: calWidth }]}>
        <View style={styles.row}>{statusOptions.slice(0, 2).map(renderButton)}</View>
        <View style={styles.row}>{statusOptions.slice(2, 4).map(renderButton)}</View>
      </View>
      <CustomButton text={'다음'} style={styles.nextButton} onPress={handleNext} />
    </View>
  );
};

export default Status;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grayscale[100],
    gap: 60,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Pretendard-Bold',
    color: colors.grayscale[1000],
    textAlign: 'center',
    marginBottom: 50,
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  selectedButton: {
    backgroundColor: colors.primary[500],
  },
  unselectedButton: {
    backgroundColor: colors.grayscale[200],
  },
  label: {
    fontSize: 20,
    fontFamily: 'Pretendard-Bold',
  },
  selectedText: {
    color: colors.grayscale[100],
  },
  unselectedText: {
    color: colors.grayscale[500],
  },
  nextButton: {
    width: '100%',
    position: 'absolute',
    bottom: 50,
  },
});
