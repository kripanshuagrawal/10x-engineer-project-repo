import { useState } from 'react';
import CollectionEditor from '../components/CollectionEditor';
import { Page, PageHeader, Card, Badge, Btn, Alert, Spinner, EmptyState } from '../components/ui.jsx';
import { useCollectionContext } from '../contexts/CollectionContext';

export default function CollectionsPage() {
  const { collections, loading, error, addCollection, editCollection, removeCollection } = useCollectionContext();
  const [editingCollection, setEditingCollection] = useState(null);

  const handleSave = async (data) => {
    if (editingCollection) await editCollection(editingCollection.id, data);
    else await addCollection(data);
    setEditingCollection(null);
  };

  return (
    <Page>
      <PageHeader title="Collections" subtitle={`${collections.length} collection${collections.length !== 1 ? 's' : ''}`} />
      <CollectionEditor existing={editingCollection} onSave={handleSave} />
      {loading && <Spinner />}
      {error && <div style={{ marginBottom: 12 }}><Alert variant="error">{error}</Alert></div>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {collections.length === 0 && !loading && <EmptyState icon="📁" title="No collections yet" description="Create a collection to organize your prompts" />}
        {collections.map(col => (
          <Card key={col.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontWeight: 500, fontSize: 14, marginBottom: col.description ? 3 : 0 }}>{col.name}</p>
              {col.description && <p style={{ color: 'var(--ink-2)', fontSize: 13 }}>{col.description}</p>}
            </div>
            <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
              <Btn variant="secondary" size="sm" onClick={() => setEditingCollection(col)}>Edit</Btn>
              <Btn variant="danger" size="sm" onClick={() => removeCollection(col.id)}>Delete</Btn>
            </div>
          </Card>
        ))}
      </div>
    </Page>
  );
}
