import { createContext, useContext } from 'react';
import useCollections from '../hooks/useCollections';

const CollectionContext = createContext(null);

export function CollectionProvider({ children }) {
  const value = useCollections();
  return (
    <CollectionContext.Provider value={value}>
      {children}
    </CollectionContext.Provider>
  );
}

export function useCollectionContext() {
  return useContext(CollectionContext);
}
