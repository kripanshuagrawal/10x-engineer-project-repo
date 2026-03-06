import { useState } from 'react';
import api from '../services/api';

export default function useVersions(collectionId, promptId) {
  const [versions, setVersions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchVersions = async () => {
    if (!collectionId || !promptId) return;
    setLoading(true);
    try {
      const res = await api.get(`/collections/${collectionId}/prompts/${promptId}/versions`);
      setVersions(res.data || []);
    } catch (err) {
      setError('Failed to fetch versions.');
    } finally {
      setLoading(false);
    }
  };

  const createVersion = async (updatedContent, changesSummary) => {
    const res = await api.post(`/collections/${collectionId}/prompts/${promptId}/version`, {
      updated_content: updatedContent,
      changes_summary: changesSummary,
    });
    await fetchVersions();
    return res.data;
  };

  const revertVersion = async (targetVersionId) => {
    const res = await api.post(`/collections/${collectionId}/prompts/${promptId}/revert`, {
      target_version_id: targetVersionId,
    });
    await fetchVersions();
    return res.data;
  };

  return { versions, loading, error, fetchVersions, createVersion, revertVersion };
}
