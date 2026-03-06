import { useEffect, useState, useCallback } from 'react';
import { getCollections } from '../services/promptService';
import { Input, Btn, EmptyState } from './ui.jsx';
import PromptItem from './PromptItem';

export default function PromptList({ prompts, onEdit, onDelete, search, setSearch, collectionId, setCollectionId, onSearch, refreshKey }) {
  const [collections, setCollections] = useState([]);

  const fetchCollections = useCallback(() => {
    getCollections().then(res => {
      const data = res.data;
      setCollections(Array.isArray(data) ? data : data.collections || []);
    });
  }, []);

  // Re-fetch collections whenever refreshKey changes (e.g. after a new collection is created)
  useEffect(() => {
    fetchCollections();
  }, [refreshKey]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <Input
          placeholder="Search prompts..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && onSearch()}
          style={{ flex: 1, minWidth: 0 }}
        />
        <select
          value={collectionId}
          onChange={e => setCollectionId(e.target.value)}
          style={{
            flexShrink: 0, width: 160,
            background: 'var(--bg-2)', color: 'var(--ink)',
            border: '1px solid var(--border)', borderRadius: 'var(--r)',
            padding: '8px 28px 8px 10px', fontFamily: 'var(--font)', fontSize: 13,
            outline: 'none', cursor: 'pointer', appearance: 'none',
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='11' viewBox='0 0 24 24' fill='none' stroke='%234e5666' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}
          onFocus={e => { e.target.style.borderColor = 'var(--hi)'; e.target.style.boxShadow = '0 0 0 3px var(--hi-dim)'; }}
          onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
        >
          <option value="">All collections</option>
          {collections.map(col => <option key={col.id} value={col.id}>{col.name}</option>)}
        </select>
        <Btn variant="secondary" size="sm" onClick={onSearch} style={{ flexShrink: 0 }}>Search</Btn>
      </div>

      {prompts.length === 0
        ? <EmptyState icon="✦" title="No prompts found" description="Create your first prompt or adjust your filters" />
        : prompts.map(p => <PromptItem key={p.id} prompt={p} onEdit={onEdit} onDelete={onDelete} collections={collections} />)
      }
    </div>
  );
}
