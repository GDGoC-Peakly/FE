import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { colors } from '../../../styles/colors'
import { Ionicons } from '@expo/vector-icons' 
import Settingicon from '../../../../assets/img/homeScreens/setting_icon.svg'
import Reporticon from '../../../../assets/img/homeScreens/report_icon.svg'
import { useNavigation } from '@react-navigation/native'


const HomeFooter = () => {
  const navigation = useNavigation();
  
  return (
    <View style={styles.footerContainer}>

      <View style={styles.iconSection}>

        <TouchableOpacity activeOpacity={0.7} style={styles.iconButton}>
          <Settingicon style={styles.imageIcon} resizeMode="contain"
          onPress={() => navigation.navigate('Setting')}
          />
        </TouchableOpacity>
        
        <TouchableOpacity activeOpacity={0.7} style={styles.iconButton}>
          <Reporticon style={styles.imageIcon} resizeMode="contain"/>
        </TouchableOpacity>
      </View>


      <TouchableOpacity activeOpacity={0.8} style={styles.focusButton}>
        <Ionicons name="play" size={18} color={colors.grayscale[1000]} style={styles.playIcon} />
        <Text style={styles.focusButtonText}>집중모드</Text>
      </TouchableOpacity>
    </View>
  )
}

export default HomeFooter

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