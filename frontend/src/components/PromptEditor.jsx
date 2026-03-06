import { useState, useEffect } from 'react';
import { getCollections } from '../services/promptService';
import { createCollection } from '../services/collectionService';
import { Card, Btn, Input, Textarea, Select, Alert, Label } from './ui.jsx';

export default function PromptEditor({ existing, onSave, onCancel }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [description, setDescription] = useState('');
  const [collectionId, setCollectionId] = useState('');
  const [collections, setCollections] = useState([]);
  const [error, setError] = useState('');
  const [showNewCollection, setShowNewCollection] = useState(false);
  const [newColName, setNewColName] = useState('');
  const [newColDesc, setNewColDesc] = useState('');
  const [creatingCol, setCreatingCol] = useState(false);

  const loadCollections = () =>
    getCollections().then(res => {
      const data = res.data;
      setCollections(Array.isArray(data) ? data : data.collections || []);
    });

  useEffect(() => {
    loadCollections();
    setTitle(existing?.title || '');
    setContent(existing?.content || '');
    setDescription(existing?.description || '');
    setCollectionId(existing?.collection_id || '');
  }, [existing]);

  const handleCreateCollection = async () => {
    if (!newColName.trim()) return;
    setCreatingCol(true);
    try {
      const res = await createCollection({ name: newColName, description: newColDesc });
      await loadCollections();
      setCollectionId(res.data.id);
      setNewColName(''); setNewColDesc('');
      setShowNewCollection(false);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to create collection.');
    } finally {
      setCreatingCol(false);
    }
  };

  const handleSubmit = async () => {
    setError('');
    if (!title.trim()) { setError('Title is required.'); return; }
    if (!content.trim()) { setError('Content is required.'); return; }
    if (!collectionId) { setError('Please select or create a collection.'); return; }
    try {
      await onSave({ title, content, description, collection_id: collectionId });
    } catch (err) {
      setError(err.response?.data?.detail || 'Something went wrong.');
    }
  };

  return (
    <Card accent style={{ marginBottom: 20 }}>
      <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 14, color: 'var(--ink)' }}>
        {existing ? 'Edit Prompt' : 'New Prompt'}
      </p>
      {error && <div style={{ marginBottom: 12 }}><Alert variant="error">{error}</Alert></div>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <Input placeholder="Description (optional)" value={description} onChange={e => setDescription(e.target.value)} />
        <Textarea placeholder="Prompt content..." value={content} onChange={e => setContent(e.target.value)}
          style={{ minHeight: 120, fontFamily: 'var(--mono)', fontSize: 13 }} />

        {/* Collection selector */}
        <div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <Select value={collectionId} onChange={e => setCollectionId(e.target.value)}>
              <option value="">— Select a collection (required) —</option>
              {collections.map(col => <option key={col.id} value={col.id}>{col.name}</option>)}
            </Select>
            <Btn variant="ghost" size="sm" onClick={() => setShowNewCollection(v => !v)}
              style={{ whiteSpace: 'nowrap', color: 'var(--hi)', borderColor: 'var(--hi-border)' }}>
              {showNewCollection ? '✕ Cancel' : '+ New'}
            </Btn>
          </div>

          {/* Inline new collection form */}
          {showNewCollection && (
            <div className="fade-up" style={{ marginTop: 10, padding: '14px', background: 'var(--bg-2)', borderRadius: 'var(--r)', border: '1px solid var(--border)' }}>
              <Label>Create New Collection</Label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <Input placeholder="Collection name" value={newColName} onChange={e => setNewColName(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleCreateCollection()} />
                <Input placeholder="Description (optional)" value={newColDesc} onChange={e => setNewColDesc(e.target.value)} />
                <div>
                  <Btn variant="primary" size="sm" onClick={handleCreateCollection}>
                    {creatingCol ? 'Creating...' : 'Create & Select'}
                  </Btn>
                </div>
              </div>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: 8, paddingTop: 4 }}>
          <Btn variant="primary" size="sm" onClick={handleSubmit}>{existing ? 'Save Changes' : 'Create Prompt'}</Btn>
          {onCancel && <Btn variant="ghost" size="sm" onClick={onCancel}>Cancel</Btn>}
        </div>
      </div>
    </Card>
  );
}
