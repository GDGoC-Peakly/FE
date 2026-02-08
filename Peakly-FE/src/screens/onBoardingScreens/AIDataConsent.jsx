import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import ArrowLeft from '../../../assets/img/Onboarding/arrowLeft.svg';
import { colors } from '../../styles/colors';

const AIDataConsent = () => {
  return (
    <View style={styles.baseContainer}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerContainer}>
          <Pressable style={styles.leftButton} onPress={() => {}}>
            <ArrowLeft />
          </Pressable>
          <Text style={styles.title}>데이터 분석 및 AI 학습 동의서</Text>
        </View>

        <View style={styles.contentBox}>
          <Text style={styles.sectionTitle}>1. 수집 및 활용 목적</Text>
          <Text style={styles.bodyText}>
            Peakly는 회원의 생활 습관과 집중도의 상관관계를 분석하여 개인 맞춤형 집중 시간(Peak
            Time) 예측 서비스를 제공하고, 인공지능(AI) 알고리즘의 정확도를 개선하기 위해 데이터를
            활용합니다.
          </Text>

          <Text style={styles.sectionTitle}>2. 활용하는 데이터 항목</Text>
          <Text style={styles.indentedText}>
            • 수면 데이터 (기상/취침 시각, 수면 만족도){'\n'}• 집중 세션 데이터 (집중 시간, 시각,
            일시정지 횟수){'\n'}• 컨디션 데이터 (피로도, 카페인 섭취 여부 및 반응도, 소음 민감도 및
            환경){'\n'}• 피드백 데이터 (사용자가 입력한 실제 집중도 점수, 방해 원인)
          </Text>

          <Text style={styles.sectionTitle}>3. 데이터의 처리 및 보호</Text>
          <Text style={styles.bodyText}>
            수집된 데이터는 특정 개인을 식별할 수 없는 통계적 형태(익명화)로 변환되어 AI 모델의 기계
            학습(Machine Learning) 및 통계 분석 자료로만 활용됩니다.
          </Text>

          <Text style={styles.sectionTitle}>4. 동의 거부 권리 및 불이익</Text>
          <Text style={styles.bodyText}>
            귀하는 본 동의를 거부할 권리가 있습니다. 단, 본 동의는 Peakly의 핵심 기능인 'AI 기반
            피크타임 예측'을 위해 필수적이므로, 동의하지 않을 경우 AI 기반 피크타임 예측 등 일부
            핵심 기능의 이용이 제한될 수 있습니다.
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>부칙: 본 동의서는 2026년 2월 2일부터 시행합니다.</Text>
          <Text style={styles.footerText}>서비스 관련 문의: gdgoc.peakly@gmail.com</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default AIDataConsent;

const styles = StyleSheet.create({
  baseContainer: {
    flex: 1,
    backgroundColor: colors.grayscale[100],
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  headerContainer: {
    flexDirection: 'row',
    marginTop: 60,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  leftButton: {
    position: 'absolute',
    left: 0,
    padding: 8,
  },
  title: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 18,
    color: colors.grayscale[900],
  },
  contentBox: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Pretendard-Bold',
    marginTop: 25,
    marginBottom: 10,
    color: colors.grayscale[900],
  },
  bodyText: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.grayscale[600],
  },
  indentedText: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.grayscale[600],
    marginLeft: 20,
  },
  footer: {
    marginTop: 40,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: colors.grayscale[200],
  },
  footerText: {
    fontSize: 12,
    color: colors.grayscale[400],
    marginBottom: 5,
  },
});
