import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = '@peakly/token';

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
