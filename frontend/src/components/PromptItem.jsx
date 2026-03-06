import { useNavigate } from 'react-router-dom';
import { Card, Badge, Btn } from './ui.jsx';

export default function PromptItem({ prompt, onEdit, onDelete, collections = [] }) {
  const navigate = useNavigate();
  const collectionName = collections.find(c => c.id === prompt.collection_id)?.name;

  return (
    <Card style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p onClick={() => navigate(`/prompts/${prompt.id}`)}
          style={{ fontWeight: 500, fontSize: 14, color: 'var(--hi)', cursor: 'pointer', marginBottom: 4, transition: 'var(--ease)' }}
          onMouseEnter={e => e.target.style.opacity = '0.75'}
          onMouseLeave={e => e.target.style.opacity = '1'}
        >{prompt.title}</p>
        {prompt.description && (
          <p style={{ color: 'var(--ink-2)', fontSize: 13, marginBottom: 10, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical' }}>
            {prompt.description}
          </p>
        )}
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
          {collectionName && <Badge variant="hi">📁 {collectionName}</Badge>}
          <Badge>{new Date(prompt.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</Badge>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
        <Btn variant="secondary" size="sm" onClick={() => onEdit(prompt)}>Edit</Btn>
        <Btn variant="danger" size="sm" onClick={() => onDelete(prompt.id)}>Delete</Btn>
      </div>
    </Card>
  );
}
