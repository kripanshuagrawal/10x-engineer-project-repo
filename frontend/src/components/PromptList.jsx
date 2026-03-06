import React, { useEffect, useState } from 'react';
import { fetchPrompts } from '../services/promptService';

const PromptList = () => {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPrompts = async () => {
      try {
        const data = await fetchPrompts();
        setPrompts(data.prompts);
      } catch {
        setError('Failed to load prompts');
      } finally {
        setLoading(false);
      }
    };

    loadPrompts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <ul>
      {prompts.map(prompt => (
        <li key={prompt.id}>{prompt.title}</li>
      ))}
    </ul>
  );
};

export default PromptList;