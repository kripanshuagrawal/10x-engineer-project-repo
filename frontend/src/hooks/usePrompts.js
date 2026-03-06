import { useState, useEffect } from 'react';
import { getPrompts, createPrompt, updatePrompt, deletePrompt } from '../services/promptService';

export default function usePrompts(collectionId = '', search = '') {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchPrompts = async () => {
    setLoading(true);
    try {
      const res = await getPrompts(collectionId, search);
      const data = res.data;
      setPrompts(Array.isArray(data) ? data : data.prompts || []);
    } catch (err) {
      setError('Failed to fetch prompts.');
    } finally {
      setLoading(false);
    }
  };

  const addPrompt = async (data) => {
    const res = await createPrompt(data);
    setPrompts(prev => [res.data, ...prev]);
  };

  const editPrompt = async (id, data) => {
    const res = await updatePrompt(id, data);
    setPrompts(prev => prev.map(p => p.id === id ? res.data : p));
  };

  const removePrompt = async (id) => {
    await deletePrompt(id);
    setPrompts(prev => prev.filter(p => p.id !== id));
  };

  useEffect(() => { fetchPrompts(); }, [collectionId, search]);

  return { prompts, loading, error, fetchPrompts, addPrompt, editPrompt, removePrompt };
}
