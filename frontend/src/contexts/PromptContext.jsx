import { createContext, useContext, useState } from 'react';
import usePrompts from '../hooks/usePrompts';

const PromptContext = createContext(null);

export function PromptProvider({ children }) {
  const [collectionId, setCollectionId] = useState('');
  const [search, setSearch] = useState('');
  const value = { ...usePrompts(collectionId, search), collectionId, setCollectionId, search, setSearch };
  return (
    <PromptContext.Provider value={value}>
      {children}
    </PromptContext.Provider>
  );
}

export function usePromptContext() {
  return useContext(PromptContext);
}
