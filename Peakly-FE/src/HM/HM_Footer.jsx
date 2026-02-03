import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { colors } from '../styles/colors'
import { Ionicons } from '@expo/vector-icons' // 집중모드 재생 아이콘용
import setting_icon from '../../assets/img/HM/setting_icon.png'
import report_icon from '../../assets/img/HM/report_icon.png'

const HM_Footer = () => {
  return (
    <View style={styles.footerContainer}>
      {/* 왼쪽 아이콘 영역 */}
      <View style={styles.iconSection}>
        {/* 설정 아이콘 */}
        <TouchableOpacity activeOpacity={0.7} style={styles.iconButton}>
          <Image source={setting_icon} style={styles.imageIcon} resizeMode="contain" />
        </TouchableOpacity>
        
        {/* 리포트(통계) 아이콘 */}
        <TouchableOpacity activeOpacity={0.7} style={styles.iconButton}>
          <Image source={report_icon} style={styles.imageIcon} resizeMode="contain" />
        </TouchableOpacity>
      </View>

      {/* 오른쪽 집중모드 버튼 */}
      <TouchableOpacity activeOpacity={0.8} style={styles.focusButton}>
        <Ionicons name="play" size={18} color={colors.grayscale[1000]} style={styles.playIcon} />
        <Text style={styles.focusButtonText}>집중모드</Text>
      </TouchableOpacity>
    </View>
  )
}

export default HM_Footer

const styles = StyleSheet.create({
  footerContainer: {
    position: 'absolute',
    zIndex: 10000,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.grayscale[900] || '#1A1A1A',
    paddingHorizontal: 31,
    height: 109,
    width: '100%',
  },
  iconSection: {
    marginBottom: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginRight: 40, 
  },
  imageIcon: {
    width: 24,
    height: 24,
  },
  focusButton: {
    marginBottom: 30,
    backgroundColor: colors.sub[200], 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12, 
    width: 141,
  },
  playIcon: {
    marginRight: 10,
  },
  focusButtonText: {
    color: colors.grayscale[1000], 
    fontSize: 14,
    fontFamily: 'Pretendard-Bold'
  },
})