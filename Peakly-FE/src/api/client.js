import axios from 'axios';
import { getToken, removeToken } from '../utils/storage';

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
    // const token = await getToken();
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJwZWFrbHkiLCJzdWIiOiI3IiwiaWF0IjoxNzcxMTU1MjM1LCJleHAiOjE3NzExNTg4MzUsInR5cCI6IkFDQ0VTUyJ9.R945_Utk8li40gOryWeYdz84AIderY65401yB8PeM0s"
    console.log("현재 요청 토큰:", token);
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
