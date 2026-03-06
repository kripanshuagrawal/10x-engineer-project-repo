import { useState, useEffect } from 'react';
import { getCollections, createCollection, updateCollection, deleteCollection } from '../services/collectionService';

export default function useCollections() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchCollections = async () => {
    setLoading(true);
    try {
      const res = await getCollections();
      const data = res.data;
      setCollections(Array.isArray(data) ? data : data.collections || []);
    } catch (err) {
      setError('Failed to fetch collections.');
    } finally {
      setLoading(false);
    }
  };

  const addCollection = async (data) => {
    const res = await createCollection(data);
    setCollections(prev => [...prev, res.data]);
  };

  const editCollection = async (id, data) => {
    const res = await updateCollection(id, data);
    setCollections(prev => prev.map(c => c.id === id ? res.data : c));
  };

  const removeCollection = async (id) => {
    await deleteCollection(id);
    setCollections(prev => prev.filter(c => c.id !== id));
  };

  useEffect(() => { fetchCollections(); }, []);

  return { collections, loading, error, fetchCollections, addCollection, editCollection, removeCollection };
}
