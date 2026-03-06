import { useEffect, useState } from 'react';
import { getCollections } from '../services/promptService';
import { Input, Select, Btn, EmptyState } from './ui.jsx';
import PromptItem from './PromptItem';

export default function PromptList({ prompts, onEdit, onDelete, search, setSearch, collectionId, setCollectionId, onSearch }) {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    getCollections().then(res => {
      const data = res.data;
      setCollections(Array.isArray(data) ? data : data.collections || []);
    });
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ display: 'flex', gap: 8 }}>
        <Input placeholder="Search prompts..." value={search} onChange={e => setSearch(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && onSearch()} style={{ flex: 1 }} />
        <Select value={collectionId} onChange={e => setCollectionId(e.target.value)} style={{ width: 'auto', minWidth: 160 }}>
          <option value="">All collections</option>
          {collections.map(col => <option key={col.id} value={col.id}>{col.name}</option>)}
        </Select>
        <Btn variant="secondary" size="sm" onClick={onSearch}>Search</Btn>
      </div>
      {prompts.length === 0
        ? <EmptyState icon="✦" title="No prompts found" description="Create your first prompt or adjust your filters" />
        : prompts.map(p => <PromptItem key={p.id} prompt={p} onEdit={onEdit} onDelete={onDelete} collections={collections} />)
      }
    </div>
  );
}
