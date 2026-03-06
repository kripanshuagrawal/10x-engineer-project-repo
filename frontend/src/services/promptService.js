import api from './api';

export const getPrompts = (collectionId, search) => {
  const params = {};
  if (collectionId) params.collection_id = collectionId;
  if (search) params.search = search;
  return api.get('/prompts', { params });
};

export const getPrompt = (id) => api.get(`/prompts/${id}`);
export const createPrompt = (data) => api.post('/prompts', data);
export const updatePrompt = (id, data) => api.put(`/prompts/${id}`, data);
export const deletePrompt = (id) => api.delete(`/prompts/${id}`);
export const getCollections = () => api.get('/collections');
