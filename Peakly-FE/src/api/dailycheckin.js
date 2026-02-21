import client from './client';

export const dailyApi = {
  // 생성 (POST)
  createCheckIn: (data) => 
    client.post('/daily/check-in', data),

  // 수정 (PATCH)
  updateCheckIn: (baseDate, data) => 
    client.patch(`/daily/check-in/${baseDate}`, data),

  getCheckIn: (baseDate) => 
    client.get(`/daily/check-in/${baseDate}`),
};