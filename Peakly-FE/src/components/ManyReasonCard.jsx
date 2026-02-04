import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../styles/colors';
import { REASON_CONFIG } from '../constants/reasonData';

const ManyReasonCard = ({ reasons = [] }) => {
  if (!reasons || reasons.length === 0) return null;
  const topReasons = reasons.slice(0, 3);
  const firstReasonConfig = REASON_CONFIG[topReasons[0].code];
  const firstReasonName = firstReasonConfig
    ? firstReasonConfig.label.replace('\n', ' ')
    : topReasons[0].name;
  return (
    <View style={styles.container}>
      <Text style={styles.reasonTitle}>
        이번 달에는 <Text style={styles.highlightText}> {firstReasonName} </Text>이(가){'\n'}
        가장 방해되었어요.
      </Text>
      <View style={styles.listContainer}>
        {topReasons.map((item, index) => {
          const config = REASON_CONFIG[item.code];
          if (!config) return null;
          return (
            <View key={item.reasonId || index} style={styles.reason}>
              <View style={styles.circle}>
                <Text style={styles.number}>{index + 1}</Text>
              </View>
              <Text style={styles.reasonText}>{config.label.replace('\n', ' ')}</Text>
              <Text style={styles.times}>{item.count}회</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default ManyReasonCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.grayscale[100],
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 20,
    width: '100%',
    alignSelf: 'center',
  },
  listContainer: {
    marginTop: 18,
    gap: 8,
  },
  reasonTitle: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 16,
    color: colors.grayscale[1000],
    lineHeight: 24,
  },
  highlightText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 16,
    color: colors.primary[500],
  },
  reason: {
    width: '100%',
    paddingVertical: 9,
    paddingHorizontal: 12,
    backgroundColor: colors.primary[50],
    flexDirection: 'row',
    borderRadius: 20,
    borderColor: colors.primary[500],
    borderWidth: 1,
    alignItems: 'center',
    gap: 8,
  },
  circle: {
    width: 24,
    height: 24,
    backgroundColor: colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  number: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 12,
    color: colors.grayscale[100],
  },
  reasonText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 14,
    color: colors.primary[500],
  },
  times: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 10,
    color: colors.primary[500],
    marginLeft: 'auto',
  },
});
