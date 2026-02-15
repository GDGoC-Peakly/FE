import client from './client';

export const categoryApi = {
  getMajorCategories: () => 
    client.get('/categories/major'),

  getCustomTags: (majorCategoryId) => 
    client.get(`/categories/custom/${majorCategoryId}`),

  createCustomTag: (tagName, majorId) => 
    client.post('/categories/custom', { 
      names: [tagName], 
      majorCategoryId: Number(majorId) 
    }),

  deleteCustomTag: (tagId) => 
    client.delete(`/categories/custom/${tagId}`),

  updateCustomTag: (tagId, newName) => 
    client.patch(`/categories/custom/${tagId}`, { name: newName }),
};