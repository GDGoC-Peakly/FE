import client from './client';

export const dailyApi = {
  createCheckIn: (id, data) => 
    client.post(`/daily/check-in/${id}`, data),

  updateCheckIn: (baseDate, data) => 
    client.patch(`/daily/check-in/${baseDate}`, data),

  getCheckIn: (baseDate) => 
    client.get(`/daily/check-in/${baseDate}`),
};