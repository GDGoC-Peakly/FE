import client from './client';

// 초기 데이터 수집 (initial-data)

export const postInitialData = async (data) => {
  try {
    const response = await client.post('users/initial-data', data);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 409) {
      console.warn('이미 초기 데이터가 등록된 사용자입니다.');
    }
    throw error;
  }
};
