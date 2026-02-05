import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../styles/colors';
import { REASON_CONFIG } from '../../../constants/reasonData';
import Wrong from '../../../../assets/img/RP/wrong.svg';

const ReasonCard = ({ reasons = [] }) => {
  if (!reasons || reasons.length === 0)
    return (
      <View style={styles.container}>
        <Text style={styles.reasonText}>
          예측한 <Text style={styles.highlightText}>피크 타임</Text>과 왜 달랐을까요?
        </Text>
        <View style={styles.wrong}>
          <Wrong />
          <Text style={styles.wrongText}>
            데이터를 모으는 중이에요...{'\n'}피크타임과 조금 더 집중해볼까요?
          </Text>
        </View>
      </View>
    );
  return (
    <View style={styles.container}>
      <Text style={styles.reasonText}>
        예측한 <Text style={styles.highlightText}>피크 타임</Text>과 왜 달랐을까요?
      </Text>
      <View style={styles.cardContainer}>
        {reasons.map((item, index) => {
          const config = REASON_CONFIG[item.code];
          if (!config) return null;
          return (
            <View key={item.reasonId || index} style={styles.rectangle}>
              <View style={styles.circle}>
                <Text style={styles.number}>{index + 1}</Text>
              </View>
              <config.Icon width={config.width} height={config.height} />
              <View style={styles.textWrapper}>
                <Text style={styles.description}>{config.label}</Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default ReasonCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: colors.grayscale[100],
    alignSelf: 'center',
    borderRadius: 20,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  rectangle: {
    paddingVertical: 7.5,
    paddingHorizontal: 7.5,
    backgroundColor: colors.grayscale[200],
    borderRadius: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 100,
    height: 130,
  },
  number: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 12,
    color: colors.primary[500],
  },
  description: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 12,
    color: colors.grayscale[100],
  },
  circle: {
    width: 20,
    height: 20,
    backgroundColor: colors.primary[50],
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  textWrapper: {
    paddingVertical: 3,
    width: 86,
    alignItems: 'center',
    backgroundColor: colors.primary[500],
    borderRadius: 8,
  },
  reasonText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 16,
    color: colors.grayscale[1000],
  },
  highlightText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 16,
    color: colors.primary[500],
  },
  wrong: {
    width: '100%',
    height: 130,
    borderRadius: 12,
    backgroundColor: colors.grayscale[200],
    marginTop: 12,
    alignItems: 'center',
  },
  wrongText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 10,
    color: colors.grayscale[500],
    marginTop: -35,
    textAlign: 'center',
  },
});
