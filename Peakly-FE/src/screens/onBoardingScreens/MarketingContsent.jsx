import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import ArrowLeft from '../../../assets/img/Onboarding/arrowLeft.svg';
import { colors } from '../../styles/colors';

const MarketingConsent = () => {
  return (
    <View style={styles.baseContainer}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerContainer}>
          <Pressable style={styles.leftButton} onPress={() => {}}>
            <ArrowLeft />
          </Pressable>
          <Text style={styles.title}>마케팅 정보 수신 동의</Text>
        </View>

        <View style={styles.contentBox}>
          <Text style={styles.sectionTitle}>1. 수집 및 이용 목적</Text>
          <Text style={styles.indentedText}>
            • 새로운 기능 업데이트 및 신규 서비스 안내{'\n'}• 이벤트, 프로모션, 혜택 등 광고성 정보
            제공{'\n'}• 서비스 이용 통계 분석을 통한 맞춤형 혜택 제공
          </Text>

          <Text style={styles.sectionTitle}>2. 전송 방법</Text>
          <Text style={styles.indentedText}>• 앱 푸시 알림{'\n'}• 이메일 (Email)</Text>

          <Text style={styles.sectionTitle}>3. 보유 및 이용 기간</Text>
          <Text style={styles.indentedText}>• 회원 탈퇴 시 또는 동의 철회 시까지</Text>

          <Text style={styles.sectionTitle}>4. 동의 거부 권리</Text>
          <Text style={styles.bodyText}>
            귀하는 마케팅 정보 수신에 동의하지 않을 수 있으며, 동의하지 않더라도 기본적인 서비스
            이용에는 제한이 없습니다. 다만, 이벤트 및 혜택 안내를 받지 못할 수 있습니다. 광고성 정보
            전송 시 관련 법령에 따라 수신 거부 방법을 함께 안내합니다.
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

export default MarketingConsent;

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
