import axios from 'axios';
import { getToken, removeToken } from '../utils/stoage';

// 인스턴스 (Instance)

const client = axios.create({
  baseURL: 'https://peakly.co.kr',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 인터셉트 (interceptors)

client.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

client.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      await removeToken();
    }
    return Promise.reject(error);
  },
);

export default client;
