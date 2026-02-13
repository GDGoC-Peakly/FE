import client from './client';
import { setToken, removeToken } from '../utils/stoage';

// 로그인 (Login)
export const login = async (data) => {
  const response = await client.post('auth/login', data);
  const { isSuccess, result, message } = response.data;
  if (isSuccess && result) {
    if (result.accessToken) {
      await setToken(result.accessToken);
    }
    return result;
  }
  throw new Error(message || '로그인에 실패하였습니다.');
};

// 회원가입(signup)
export const signup = async (email, password) => {
  const response = await client.post('auth/signup', {
    email,
    password,
  });
  const { isSuccess, result, message } = response.data;

  if (isSuccess && result) {
    if (result.accessToken) {
      await setToken(result.accessToken);
    }
    return result;
  }
  throw new Error(message || '회원가입에 실패하였습니다.');
};

// 이메일 중복 확인 (check-email)
export const checkEmail = async (email) => {
  const response = await client.post('auth/check-email', { email });
  return response.data;
};

// 이메일 인증 딥링크 발송 (email-verify/send)
export const sendVerifyEmail = async (email) => {
  const response = await client.post('auth/email-verify/send', { email });
  return response.data;
};

// 이메일 인증 토큰 검증 (email-verify)
export const verifyEmail = async (token) => {
  const response = await client.post('auth/email-verify', { token });
  return response.data;
};
