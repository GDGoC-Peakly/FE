import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Switch } from 'react-native'; // Image 제거
import { colors } from '../../styles/colors';
import Profile from '../../../assets/img/settingScreens/profile.svg'; // SVG 컴포넌트
import Moreicon from '../../../assets/img/settingScreens/more_icon.svg';
import SettingHeader from '../settingScreens/settingComponents/SettingHeader';

const Setting = ({ onBack }) => {
  const navigation = useNavigation();
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);

  return (
    <View 
      style={styles.container}
    >
      <SettingHeader 
        title="설정" 
        onBack={onBack} 
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity style={styles.profileCard}>
          <View style={styles.profileInfo}>
            {/* Image 대신 SVG 컴포넌트 사용 (필요시 width, height 조절) */}
            <Profile width={60} height={60} /> 
            <View style={styles.profileText}>
              <Text style={styles.nickname}>냐옹</Text>
              <Text style={styles.userCode}>#000000</Text>
            </View>
          </View>
          <Moreicon />
        </TouchableOpacity>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>기본정보</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>크로노타입</Text>
            <Text style={styles.infoValue}>저녁형</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>나의 피크타임</Text>
            <Text style={styles.infoValue}>밤-새벽</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>카페인 반응도</Text>
            <Text style={styles.infoValue}>보통</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>소음 반응도</Text>
            <Text style={styles.infoValue}>아주 민감</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>직업</Text>
            <Text style={styles.infoValue}>대학생</Text>
          </View>
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => { navigation.navigate('SettingInfo'); }}
          >
            <Text style={styles.editButtonText}>수정하기</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>커스텀 태그</Text>
          <View style={styles.tagOuterBox}>
            <View style={styles.tagContainer}>
              {['TAG 1', 'TAG 2', 'TAG 3'].map((tag, i) => (
                <View key={i} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          </View>
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => { navigation.navigate('SettingTag'); }}
          >
            <Text style={styles.editButtonText}>수정하기</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>알림</Text>
          <View style={styles.switchRow}>
            <Text style={styles.infoLabel}>알림 수신</Text>
            <Switch
              value={isNotificationsEnabled}
              onValueChange={setIsNotificationsEnabled}
              trackColor={{ false: colors.grayscale[600], true: colors.primary[500] }}
              thumbColor={colors.grayscale[100]}
            />
          </View>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>기타</Text>
          <TouchableOpacity style={styles.otherItem}>
            <Text style={styles.infoLabel}>공지사항</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.otherItem}>
            <Text style={styles.infoLabel}>로그아웃</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.withdrawButton}>
          <Text style={styles.withdrawText}>탈퇴하기</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grayscale[200],
  },
  scrollContent: {
    padding: 20,
  },
  sectionCard: {
    backgroundColor: colors.grayscale[100],
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Pretendard-Bold',
    marginBottom: 12,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.grayscale[100],
    borderRadius: 20,
    padding: 20,
    marginBottom: 12,
    marginTop: 28,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileText: {
    marginLeft: 21,
  },
  nickname: {
    fontSize: 24,
    fontFamily: 'Pretendard-Bold',
  },
  userCode: {
    fontSize: 12,
    color: colors.grayscale[500],
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 14,
    fontFamily: 'Pretendard-Medium',
  },
  infoValue: {
    fontSize: 14,
    fontFamily: 'Pretendard-Bold',
    color: colors.primary[500],
  },
  editButton: {
    backgroundColor: colors.grayscale[200],
    borderRadius: 12,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
  },
  editButtonText: {
    fontSize: 14,
    color: colors.grayscale[500],
  },
  tagOuterBox: {
    borderWidth: 1,
    borderColor: colors.grayscale[300],
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 24,
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  tagContainer: {
    flexDirection: 'row',
    gap: 9,
  },
  tag: {
    paddingHorizontal: 19,
    paddingVertical: 5.5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.primary[500],
    backgroundColor: colors.primary[50],
  },
  tagText: {
    color: colors.primary[500],
    fontSize: 10,
    fontFamily: 'Pretendard-Bold',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  otherItem: {
    paddingVertical: 10,
  },
  withdrawButton: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 114,
  },
  withdrawText: {
    color: colors.grayscale[500],
    textDecorationLine: 'underline',
  },
});