import { useState, useEffect } from 'react';
import { Card, Input, Btn, Alert } from './ui.jsx';

export default function CollectionEditor({ existing, onSave }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setName(existing?.name || '');
    setDescription(existing?.description || '');
  }, [existing]);

  const handleSubmit = async () => {
    if (!name.trim()) { setError('Name is required.'); return; }
    setError('');
    await onSave({ name, description });
    setName(''); setDescription('');
  };

  return (
    <Card accent={!!existing} style={{ marginBottom: 20 }}>
      <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 14, color: 'var(--ink)' }}>{existing ? 'Edit Collection' : 'New Collection'}</p>
      {error && <div style={{ marginBottom: 10 }}><Alert variant="error">{error}</Alert></div>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Input placeholder="Collection name" value={name} onChange={e => setName(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSubmit()} />
        <Input placeholder="Description (optional)" value={description} onChange={e => setDescription(e.target.value)} />
        <div style={{ paddingTop: 4 }}>
          <Btn variant="primary" size="sm" onClick={handleSubmit}>{existing ? 'Save Changes' : 'Create'}</Btn>
        </div>
      </div>
    </Card>
  );
}
