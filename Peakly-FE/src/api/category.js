import client from './client';

export const categoryApi = {
  //대분류 목록 조회
  getMajorCategories: () => 
    client.get('/categories/major'),

  //커스텀 태그 목록 조회
  getCustomTags: (majorCategoryId) => 
    client.get(`/categories/custom/${majorCategoryId}`),

  //커스텀 태그 생성
  createCustomTag: (tagName, majorId) => 
    client.post('/categories/custom', { 
      names: [tagName], 
      majorCategoryId: Number(majorId) 
    }),

  //커스텀 태그 삭제
  deleteCustomTag: (tagId) => 
    client.delete(`/categories/custom/${tagId}`),

  //커스텀 태그 수정
  updateCustomTag: (tagId, newName) => 
    client.patch(`/categories/custom/${tagId}`, { name: newName }),
};