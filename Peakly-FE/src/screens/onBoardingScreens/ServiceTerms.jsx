import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import ArrowLeft from '../../../assets/img/Onboarding/arrowLeft.svg';
import { colors } from '../../styles/colors';

const ServiceTerms = ({ navigation }) => {
  return (
    <View style={styles.baseContainer}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerContainer}>
          <Pressable
            style={styles.leftButton}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <ArrowLeft />
          </Pressable>
          <Text style={styles.title}>서비스 이용약관</Text>
        </View>

        {/* 본문 */}
        <View style={styles.contentBox}>
          <Text style={styles.sectionTitle}>제1조 (목적)</Text>
          <Text style={styles.bodyText}>
            본 약관은 Peakly(이하 "서비스 제공자")가 제공하는 집중 시간 예측 및 관리 서비스인
            Peakly(이하 "서비스")의 이용과 관련하여 서비스 제공자와 회원 간의 권리, 의무 및
            책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
          </Text>

          <Text style={styles.sectionTitle}>제2조 (용어의 정의)</Text>
          <Text style={styles.bodyText}>
            1. "서비스"란 단말기(모바일, 태블릿 등)와 상관없이 회원이 이용할 수 있는 Peakly 및 관련
            제반 서비스를 의미합니다.{'\n'}
            2. "회원"이란 본 약관에 따라 서비스 제공자와 이용계약을 체결하고 서비스 제공자가
            제공하는 서비스를 이용하는 고객을 말합니다.{'\n'}
            3. "AI 예측 정보"란 회원이 입력한 데이터를 기반으로 인공지능 알고리즘이 분석하여
            제공하는 최적 집중 시간, 컨디션 분석 등의 정보를 의미합니다.
          </Text>

          <Text style={styles.sectionTitle}>제3조 (약관의 효력 및 변경)</Text>
          <Text style={styles.bodyText}>
            1. 본 약관은 서비스 화면에 게시하거나 기타의 방법으로 회원에게 공지함으로써 효력이
            발생합니다.{'\n'}
            2. 서비스 제공자는 필요하다고 인정되는 경우 관련 법령을 위배하지 않는 범위 내에서 본
            약관을 개정할 수 있습니다.{'\n'}
            3. 회원이 개정된 약관에 동의하지 않는 경우 서비스 이용을 중단하고 탈퇴할 수 있습니다.
            다만, 개정 효력 발생일 이후에도 서비스를 계속 이용하는 경우 약관 변경에 동의한 것으로
            간주합니다.
          </Text>

          <Text style={styles.sectionTitle}>제4조 (이용계약 체결)</Text>
          <Text style={styles.bodyText}>
            1. 이용계약은 회원이 되고자 하는 자(이하 "가입신청자")가 약관의 내용에 동의하고 가입을
            신청한 후, 서비스 제공자가 이를 승낙함으로써 체결됩니다.{'\n'}
            2. 서비스 제공자는 다음 각 호에 해당하는 신청에 대하여는 승낙을 하지 않거나 사후에
            이용계약을 해지할 수 있습니다.
          </Text>
          <Text style={styles.indentedText}>
            a. 가입신청자가 만 14세 미만인 경우{'\n'}
            b. 타인의 명의를 이용하거나 허위 정보를 입력한 경우{'\n'}
            c. 부정한 용도로 서비스를 이용하고자 하는 경우{'\n'}
            d. 기타 규정한 제반 사항을 위반하여 신청하는 경우
          </Text>

          <Text style={styles.sectionTitle}>제5조 (개인정보보호 및 AI 데이터 활용)</Text>
          <Text style={styles.bodyText}>
            1. 서비스 제공자는 「개인정보보호법」 등 관련 법령이 정하는 바에 따라 회원의 개인정보를
            보호하기 위해 노력합니다.{'\n'}
            2. AI 학습 및 분석 데이터 활용: 회원이 서비스 이용 과정에서 입력한 정보(수면 시간,
            피로도, 집중도 평가, 방해 요인 등)는 개인을 식별할 수 없는 형태(익명화)로 가공되어 AI
            모델의 학습, 정확도 개선 및 통계 분석에 활용될 수 있습니다.{'\n'}
            3. 회원은 이에 동의하지 않을 권리가 있으나, 동의하지 않을 경우 맞춤형 예측 서비스 등
            핵심 기능의 이용이 제한될 수 있습니다.
          </Text>

          <Text style={styles.sectionTitle}>제6조 (서비스의 제공 및 변경)</Text>
          <Text style={styles.bodyText}>
            1. 서비스 제공자가 제공하는 서비스의 내용은 다음과 같습니다.
          </Text>
          <Text style={styles.indentedText}>
            a. 집중 타이머 및 기록 관리 기능{'\n'}
            b. 사용자 데이터 기반의 최적 집중 시간(Peak Time) 예측{'\n'}
            c. 수면, 카페인 등 생활 습관과 집중도의 상관관계 분석 리포트{'\n'}
            d. 기타 서비스 제공자가 추가로 개발하거나 제휴를 통해 제공하는 일체의 서비스
          </Text>
          <Text style={styles.bodyText}>
            2. 서비스 제공자는 기술적 사양의 변경이나 운영상의 필요에 따라 제공할 서비스의 내용을
            변경할 수 있습니다.
          </Text>

          <Text style={styles.sectionTitle}>제7조 (서비스 제공자의 면책 및 한계)</Text>
          <Text style={styles.bodyText}>
            1. 서비스의 성격: 본 서비스가 제공하는 수면 분석, 피로도 측정, 집중 시간 예측 등의
            정보는 회원의 생활 습관 관리를 돕기 위한 보조적 정보일 뿐이며, 의학적 진단이나 전문적인
            치료 행위를 대체하지 않습니다. 건강상의 문제가 의심되는 경우 반드시 전문 의료기관의
            도움을 받아야 합니다.{'\n'}
            2. AI 예측의 한계: 인공지능이 제공하는 예측 결과는 확률에 기반한 추정치이므로, 그
            정확성이나 회원의 실제 학업/업무 성과를 보장하지 않습니다. 서비스 제공자는 예측 결과와
            실제 결과의 불일치로 인해 발생한 손해에 대하여 책임을 지지 않습니다.{'\n'}
            3. 서비스 제공자는 천재지변, 서비스 설비의 장애, 기간통신사업자의 서비스 중지 등
            불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 대한 책임이
            면제됩니다.
          </Text>

          <Text style={styles.sectionTitle}>제8조 (회원의 의무)</Text>
          <Text style={styles.bodyText}>
            회원은 다음 행위를 하여서는 안 됩니다.{'\n'}
            1. 신청 또는 변경 시 허위 내용의 등록{'\n'}
            2. 타인의 정보 도용{'\n'}
            3. 서비스 제공자의 서비스 운영을 고의로 방해하거나 안정적 운영을 저해하는 행위{'\n'}
            4. 리버스 엔지니어링, 소스 코드 추출 등 서비스 제공자의 지식재산권을 침해하는 행위
          </Text>

          <Text style={styles.sectionTitle}>제9조 (서비스 이용의 중지 및 계약 해지)</Text>
          <Text style={styles.bodyText}>
            1. 회원은 언제든지 앱 내 설정 메뉴 등을 통하여 이용계약 해지 신청(회원 탈퇴)을 할 수
            있으며, 서비스 제공자는 관련 법령이 정하는 바에 따라 이를 즉시 처리하여야 합니다.{'\n'}
            2. 회원이 계약을 해지하는 경우, 관련 법령 및 개인정보처리방침에 따라 서비스 제공자가
            정보를 보유하여야 하는 경우를 제외하고는 회원의 모든 데이터는 소멸됩니다. 단, 제5조에
            따라 이미 익명화되어 AI 학습에 반영된 데이터는 삭제되지 않을 수 있습니다.
          </Text>

          <Text style={styles.sectionTitle}>제10조 (준거법 및 재판관할)</Text>
          <Text style={styles.bodyText}>
            1. 서비스 제공자와 회원 간에 제기된 소송은 대한민국 법을 준거법으로 합니다.{'\n'}
            2. 서비스 이용과 관련하여 발생한 분쟁에 대한 소송은 민사소송법상의 관할 법원에
            제기합니다.
          </Text>
        </View>

        {/* 푸터 */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>부칙: 본 약관은 2026년 2월 2일부터 시행합니다.</Text>
          <Text style={styles.footerText}>서비스 관련 문의: gdgoc.peakly@gmail.com</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default ServiceTerms;

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
  },
  bodyText: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.grayscale[600],
  },
  indentedText: {
    fontSize: 14,
    color: colors.grayscale[600],
    marginLeft: 20,
  },
  highlight: {
    backgroundColor: 'rgba(0,0,0,0.03)',
    padding: 10,
    borderRadius: 8,
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
