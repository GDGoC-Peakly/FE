import { StyleSheet, Text, View, Image, ScrollView, SafeAreaView, ImageBackground } from 'react-native'
import React from 'react'
import Peakly from '../../assets/img/HM/Peakly.png'
import character2 from '../../assets/img/HM/character2.png' 
import talkbox from '../../assets/img/HM/talkbox.jpg'
import { colors } from '../styles/colors'

const HM = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Image source={Peakly} style={styles.logo} resizeMode="contain" />

        {/* 피크타임 카드 */}
        <View style={styles.peakCard}>
          <View style={styles.yellowBanner}>
            <Text style={styles.bannerText}>오후 2시에 집중력이 폭발할 예정이에요!</Text>
          </View>
          <View style={styles.cardPadding}>
            <Text style={styles.cardTitle}>지금은 피크타임이에요!</Text>
            <Text style={styles.cardSubTitle}>오늘의 집중 피크타임을 확인해보세요.</Text>
            
            {/* 시간 차트 섹션 */}
            <View style={styles.timeChartPlaceholder}>
                
            </View>
          </View>
        </View>

        {/* 누적 집중 시간 카드 */}
        <View style={styles.card}>
          <Text style={styles.cardDateTitle}>2월 23일 누적 집중 시간</Text>
          <View style={styles.timerWrapper}>
            <View style={styles.customTimerBox}>
              <Text style={styles.customTimerText}>01 : 38 : 41</Text>
            </View>
          </View>
          {/* 누적 집중 그래프 섹션 */}
          <View style={styles.barChartPlaceholder}>
             
          </View>
        </View>

        <View style={styles.row}>
          {/* 숙면시간 카드 */}
          <View style={[styles.card, styles.halfCard]}>
            <Text style={styles.smallCardTitle}>숙면시간</Text>
            <View style={styles.circleGraphContainer}>
               <View style={styles.circlePlaceholder}>
                  <Text style={styles.sleepText}>8h 0m</Text>
               </View>
            </View>
          </View>

          {/* 컨디션 카드 */}
          <View style={[styles.card, styles.halfCard]}>
            <Text style={styles.smallCardTitle}>컨디션</Text>
            <View style={styles.characterContainer}>
                <Image source={character2} style={styles.characterImg} resizeMode="contain" />
                
                <ImageBackground 
                  source={talkbox} 
                  style={styles.conditionTalkbox} 
                  resizeMode="contain"
                >
                    <Text style={styles.conditionTagText}>최고예요!</Text>
                </ImageBackground>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default HM

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  scrollContent: {
    padding: 20,
  },
  logo: {
    width: 100,
    height: 40,
    marginBottom: 20,
  },
  peakCard: {
    backgroundColor: colors.grayscale[100],
    borderRadius: 12,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  yellowBanner: {
    backgroundColor: colors.sub[200],
    paddingVertical: 9,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    alignItems: 'center',
  },
  bannerText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
  },
  cardPadding: {
    padding: 20,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 5,
  },
  cardSubTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  card: {
    backgroundColor: colors.grayscale[100],
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardDateTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 15,
  },
  timerWrapper: {
    alignItems: 'center',
    marginBottom: 15,
  },
  customTimerBox: {
    backgroundColor: colors.primary[500],
    width: '100%',
    height: 58,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customTimerText: {
    color: colors.grayscale[100],
    fontSize: 32,
    fontFamily: 'Pretendard-Bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfCard: {
    width: '48%',
    height: 227,
  },
  smallCardTitle: {
    fontSize: 20,
    fontFamily: 'Pretendard-Bold',
  },
  characterContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  characterImg: {
    width: 70,
    height: 90,
  },
  conditionTalkbox: {
    width: 90,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  conditionTagText: {
    fontSize: 14,
    fontFamily: 'Pretendard-Bold',
    color: colors.grayscale[1000],
    paddingTop: 12,
  },
  circleGraphContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  circlePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 12,
    borderColor: colors.primary[500],
    borderBottomColor: colors.grayscale[800],
    justifyContent: 'center',
    alignItems: 'center',
  },
  sleepText: {
    fontSize: 14,
    fontFamily: 'Pretendard-Bold',
    color: colors.primary[500],
  },
  timeChartPlaceholder: { 
    height: 145, 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderRadius: 10 
  },
  barChartPlaceholder: { 
    height: 100, 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderRadius: 10 
  },
})