import api from './api';

export const fetchPrompts = async (collectionId = null, search = null) => {
  try {
    const response = await api.get('/prompts', {
      params: { collection_id: collectionId, search },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch prompts', error);
    throw error;
  }
};

export const createPrompt = async (promptData) => {
  try {
    const response = await api.post('/prompts', promptData);
    return response.data;
  } catch (error) {
    console.error('Failed to create prompt', error);
    throw error;
  }
};

// Add further CRUD operations as needed (e.g., updatePrompt, deletePrompt)