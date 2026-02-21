import client from './client'; 

export const homeApi = {
  // 메인 홈 데이터 조회
  getHomeData: () => {
    return client.get('/daily/home');
  },
  
  // 피크타임 조회
  getPeakTimeData: () => {
    return client.get('/daily/peaktime');
  },
};