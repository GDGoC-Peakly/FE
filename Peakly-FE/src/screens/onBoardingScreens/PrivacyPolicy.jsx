import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import ArrowLeft from '../../../assets/img/Onboarding/arrowLeft.svg';
import { colors } from '../../styles/colors';

const PrivacyPolicy = () => {
  return (
    <View style={styles.baseContainer}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerContainer}>
          <Pressable style={styles.leftButton} onPress={() => {}}>
            <ArrowLeft />
          </Pressable>
          <Text style={styles.title}>개인정보 처리방침</Text>
        </View>
        <View style={styles.contentBox}>
          <Text style={styles.sectionTitle}>1. 총칙</Text>
          <Text style={styles.bodyText}>
            Peakly(이하 "서비스 제공자")는 회원의 개인정보를 중요시하며, 「개인정보보호법」 등 관련
            법령을 준수하고 있습니다.
          </Text>

          <Text style={styles.sectionTitle}>2. 수집하는 개인정보의 항목 및 수집 방법</Text>
          <Text style={styles.bodyText}>
            서비스 제공자는 서비스 제공을 위해 아래와 같은 개인정보를 수집합니다.
          </Text>

          <Text style={styles.subSectionTitle}>1. 회원가입 및 프로필 관리</Text>
          <Text style={styles.indentedText}>
            • (필수) 이메일, 닉네임, 비밀번호(이메일 가입 시), 직업, 주관적 피크타임, 수면 패턴,
            카페인/소음 민감도{'\n'}• (소셜 가입 시) 소셜 식별자, 가입 경로
          </Text>

          <Text style={styles.subSectionTitle}>2. 서비스 이용 과정 (라이프로그)</Text>
          <Text style={styles.indentedText}>
            • (필수) 기상/취침 시각, 수면 만족도, 피로도, 카페인 섭취량, 소음 환경, 집중
            시간(Start/End), 집중도 평가 점수, 방해 요인 태그
          </Text>

          <Text style={styles.subSectionTitle}>3. 자동 수집 정보</Text>
          <Text style={styles.indentedText}>
            • 서비스 이용 기록, 접속 로그, 쿠키, 기기 정보(OS, 모델명), 앱 버전
          </Text>

          <Text style={styles.sectionTitle}>3. 개인정보의 수집 및 이용 목적</Text>
          <Text style={styles.subSectionTitle}>
            1. 회원 관리: 본인 확인, 개인 식별, 불량 회원의 부정 이용 방지, 가입 의사 확인, 만 14세
            미만 아동 가입 제한
          </Text>
          <Text style={styles.subSectionTitle}>
            2. 서비스 제공: 최적 집중 시간(Peak Time) 예측, 수면 및 집중도 분석 리포트 제공, 타이머
            기능 제공
          </Text>
          <Text style={styles.subSectionTitle}>
            3. 신규 서비스 개발: AI 모델 고도화 및 통계 분석을 통한 서비스 품질 향상
          </Text>

          <Text style={styles.sectionTitle}>4. 개인정보의 보유 및 이용 기간</Text>
          <Text style={styles.bodyText}>
            원칙적으로 회원 탈퇴 시 회원의 개인정보는 지체 없이 파기합니다. 단, 다음의 정보는 예외로
            합니다.
          </Text>
          <Text style={styles.subSectionTitle}>
            1. 부정 이용 방지: 탈퇴 후 6개월 간 계정 식별 정보 보관 (재가입 제한 등 목적)
          </Text>
          <Text style={styles.subSectionTitle}>
            2. AI 학습 데이터: 회원이 입력한 라이프로그 데이터는 개인을 식별할 수 없도록 익명화 또는
            가명화 처리된 형태로 가공되어 AI 모델의 학습, 정확도 개선 및 통계 분석에 활용되며, AI
            모델 학습을 위해 영구 보관될 수 있습니다.
          </Text>

          <Text style={styles.sectionTitle}>5. 개인정보의 제3자 제공 및 위탁</Text>
          <Text style={styles.bodyText}>
            서비스 제공자는 회원의 동의 없이 개인정보를 외부에 제공하지 않습니다. 다만, 서비스
            운영을 위해 클라우드 서버(AWS 등) 및 AI 분석 엔진에 데이터 처리를 위탁할 수 있습니다.
          </Text>

          <Text style={styles.sectionTitle}>6. 이용자 및 법정대리인의 권리</Text>
          <Text style={styles.bodyText}>
            회원은 언제든지 자신의 개인정보를 조회하거나 수정할 수 있으며, 가입 해지(동의 철회)를
            요청할 수 있습니다.
          </Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>부칙: 본 방침은 2026년 2월 2일부터 시행합니다.</Text>
          <Text style={styles.footerText}>서비스 관련 문의: gdgoc.peakly@gmail.com</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default PrivacyPolicy;

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
  subSectionTitle: {
    fontSize: 14,
    fontFamily: 'Pretendard-SemiBold',
    marginTop: 12,
    marginBottom: 6,
    color: colors.grayscale[700],
    lineHeight: 22,
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
    marginBottom: 8,
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
