import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = '@peakly/token';
const REFRESH_KEY = '@peakly/refresh_token';

// Access Token 관련 함수
export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    return token;
  } catch (e) {
    console.error('토큰 가져오기 실패: ', e);
    return null;
  }
};

export const setToken = async (token) => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } catch (e) {
    console.error('토큰 저장 실패: ', e);
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch (e) {
    console.error('토큰 삭제 실패: ', e);
  }
};

// Refresh Token 관련 함수

export const getRefreshToken = async () => {
  try {
    return await AsyncStorage.getItem(REFRESH_KEY);
  } catch (e) {
    console.error('리프레시 토큰 가져오기 실패:', e);
    return null;
  }
};

export const setRefreshToken = async (token) => {
  try {
    await AsyncStorage.setItem(REFRESH_KEY, token);
  } catch (e) {
    console.error('리프레시 토큰 저장 실패:', e);
  }
};

export const removeRefreshToken = async () => {
  try {
    await AsyncStorage.removeItem(REFRESH_KEY);
  } catch (e) {
    console.error('리프레시 토큰 삭제 실패:', e);
  }
};
