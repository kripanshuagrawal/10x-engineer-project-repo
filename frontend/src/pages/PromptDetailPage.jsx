import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPrompt } from '../services/promptService';
import useVersions from '../hooks/useVersions';
import { Page, Card, Btn, Badge, Alert, Divider, Label, CodeBlock, Textarea, Input, Spinner } from '../components/ui.jsx';

export default function PromptDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState(null);
  const [error, setError] = useState('');
  const [newContent, setNewContent] = useState('');
  const [summary, setSummary] = useState('');
  const [versionMsg, setVersionMsg] = useState({ type: '', text: '' });
  const [expandedVersion, setExpandedVersion] = useState(null);

  const collectionId = prompt?.collection_id || null;
  const { versions, loading: vLoading, fetchVersions, createVersion, revertVersion } = useVersions(collectionId, id);

  useEffect(() => {
    getPrompt(id).then(res => { setPrompt(res.data); setNewContent(res.data.content); }).catch(() => setError('Prompt not found.'));
  }, [id]);

  useEffect(() => { if (collectionId && id) fetchVersions(); }, [collectionId, id]);

  const handleCreateVersion = async () => {
    setVersionMsg({});
    try { await createVersion(newContent, summary); setVersionMsg({ type: 'success', text: 'Version saved.' }); setSummary(''); }
    catch (err) { setVersionMsg({ type: 'error', text: err.response?.data?.detail || 'Failed to save version.' }); }
  };

  const handleRevert = async (versionId) => {
    setVersionMsg({});
    try { await revertVersion(versionId); setVersionMsg({ type: 'success', text: 'Reverted successfully.' }); }
    catch (err) { setVersionMsg({ type: 'error', text: err.response?.data?.detail || 'Failed to revert.' }); }
  };

  if (error) return <Page><Alert variant="error">{error}</Alert></Page>;
  if (!prompt) return <Page><Spinner /></Page>;

  return (
    <Page>
      <Btn variant="ghost" size="sm" onClick={() => navigate('/')} style={{ marginBottom: 20, paddingLeft: 4, color: 'var(--ink-3)' }}>← Back</Btn>

      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.4px', marginBottom: 6 }}>{prompt.title}</h1>
        {prompt.description && <p style={{ color: 'var(--ink-2)', fontSize: 13, marginBottom: 10 }}>{prompt.description}</p>}
        <div style={{ display: 'flex', gap: 5 }}>
          {prompt.collection_id && <Badge variant="hi">collection</Badge>}
          <Badge>{new Date(prompt.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</Badge>
        </div>
      </div>

      <Divider />

      <div style={{ marginBottom: 24 }}>
        <Label>Content</Label>
        <CodeBlock>{prompt.content}</CodeBlock>
      </div>

      {collectionId ? (
        <>
          <Divider />
          <div style={{ marginBottom: 24 }}>
            <Label>Save New Version</Label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Textarea value={newContent} onChange={e => setNewContent(e.target.value)} style={{ minHeight: 100, fontFamily: 'var(--mono)', fontSize: 13 }} />
              <Input placeholder="Describe your changes..." value={summary} onChange={e => setSummary(e.target.value)} />
              {versionMsg.text && <Alert variant={versionMsg.type === 'error' ? 'error' : 'success'}>{versionMsg.text}</Alert>}
              <div><Btn variant="primary" size="sm" onClick={handleCreateVersion}>Save Version</Btn></div>
            </div>
          </div>

          <Divider />

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <Label style={{ marginBottom: 0 }}>Version History</Label>
              {versions.length > 0 && <Badge>{versions.length}</Badge>}
            </div>
            {vLoading && <Spinner />}
            {!vLoading && versions.length === 0 && <p style={{ color: 'var(--ink-3)', fontSize: 13 }}>No versions saved yet.</p>}
            {!vLoading && versions.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {[...versions].reverse().map(v => {
                  const isExpanded = expandedVersion === v.version_id;
                  return (
                    <Card key={v.version_id} style={{ padding: 0, overflow: 'hidden' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, padding: '12px 16px' }}>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flex: 1, minWidth: 0 }}>
                          <Badge variant="hi">v{v.version_number}</Badge>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink)', marginBottom: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {v.changes_summary || 'No summary'}
                            </p>
                            <p style={{ fontSize: 11, color: 'var(--ink-3)', fontFamily: 'var(--mono)' }}>
                              {new Date(v.created_at).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                          <Btn variant="ghost" size="sm" onClick={() => setExpandedVersion(isExpanded ? null : v.version_id)}>
                            {isExpanded ? 'Hide' : 'View'}
                          </Btn>
                          <Btn variant="warning" size="sm" onClick={() => handleRevert(v.version_id)}>Revert</Btn>
                        </div>
                      </div>
                      {isExpanded && (
                        <div style={{ borderTop: '1px solid var(--border)', background: 'var(--bg)', padding: '14px 16px' }}>
                          <Label>Content at this version</Label>
                          <CodeBlock style={{ maxHeight: 240 }}>{v.content}</CodeBlock>
                        </div>
                      )}
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </>
      ) : (
        <Alert variant="info">Assign this prompt to a collection to enable version history.</Alert>
      )}
    </Page>
  );
}
