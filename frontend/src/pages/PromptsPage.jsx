import { useState } from 'react';
import PromptList from '../components/PromptList';
import PromptEditor from '../components/PromptEditor';
import { Page, PageHeader, Btn, Alert, Spinner } from '../components/ui.jsx';
import { usePromptContext } from '../contexts/PromptContext';

export default function PromptsPage() {
  const { prompts, loading, error, addPrompt, editPrompt, removePrompt, collectionId, setCollectionId, search, setSearch, fetchPrompts } = usePromptContext();
  const [editingPrompt, setEditingPrompt] = useState(null);
  const [showEditor, setShowEditor] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSave = async (data) => {
    if (editingPrompt) await editPrompt(editingPrompt.id, data);
    else await addPrompt(data);
    setEditingPrompt(null);
    setShowEditor(false);
    // Trigger PromptList to re-fetch collections so new ones appear immediately
    setRefreshKey(k => k + 1);
  };

  return (
    <Page>
      <PageHeader
        title="Prompts"
        subtitle={`${prompts.length} prompt${prompts.length !== 1 ? 's' : ''} in your library`}
        action={!showEditor && (
          <Btn variant="primary" size="sm" onClick={() => { setEditingPrompt(null); setShowEditor(true); }}>
            + New Prompt
          </Btn>
        )}
      />
      {showEditor && (
        <PromptEditor
          existing={editingPrompt}
          onSave={handleSave}
          onCancel={() => { setShowEditor(false); setEditingPrompt(null); }}
        />
      )}
      {loading && <Spinner />}
      {error && <div style={{ marginBottom: 12 }}><Alert variant="error">{error}</Alert></div>}
      <PromptList
        prompts={prompts}
        onEdit={(p) => { setEditingPrompt(p); setShowEditor(true); }}
        onDelete={removePrompt}
        search={search}
        setSearch={setSearch}
        collectionId={collectionId}
        setCollectionId={setCollectionId}
        onSearch={fetchPrompts}
        refreshKey={refreshKey}
      />
    </Page>
  );
}
