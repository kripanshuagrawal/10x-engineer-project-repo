// ── Single source of truth for all UI components ──────
// To change the theme, edit ONLY this file.

// ── Theme Definitions ─────────────────────────────────
export const THEMES = {
  'Midnight': {
    label: 'Midnight',
    '--bg':           '#111318',
    '--bg-1':         '#16191f',
    '--bg-2':         '#1c2028',
    '--bg-3':         '#222830',
    '--border':       '#2a2f3a',
    '--border-2':     '#343c4a',
    '--ink':          '#dde1ea',
    '--ink-2':        '#8a91a0',
    '--ink-3':        '#4e5666',
    '--hi':           '#7b93fd',
    '--hi-dim':       'rgba(123,147,253,0.1)',
    '--hi-border':    'rgba(123,147,253,0.22)',
    '--green':        '#4db896',
    '--green-dim':    'rgba(77,184,150,0.1)',
    '--green-border': 'rgba(77,184,150,0.22)',
    '--red':          '#e06c75',
    '--red-dim':      'rgba(224,108,117,0.1)',
    '--red-border':   'rgba(224,108,117,0.22)',
    '--amber':        '#d4976a',
    '--amber-dim':    'rgba(212,151,106,0.1)',
    '--amber-border': 'rgba(212,151,106,0.22)',
  },
  'Slate': {
    label: 'Slate',
    '--bg':           '#0f1117',
    '--bg-1':         '#141720',
    '--bg-2':         '#1a1e2a',
    '--bg-3':         '#202535',
    '--border':       '#252b3b',
    '--border-2':     '#2f374d',
    '--ink':          '#c9d1e8',
    '--ink-2':        '#7a85a0',
    '--ink-3':        '#444e66',
    '--hi':           '#56b6c2',
    '--hi-dim':       'rgba(86,182,194,0.1)',
    '--hi-border':    'rgba(86,182,194,0.22)',
    '--green':        '#98c379',
    '--green-dim':    'rgba(152,195,121,0.1)',
    '--green-border': 'rgba(152,195,121,0.22)',
    '--red':          '#e06c75',
    '--red-dim':      'rgba(224,108,117,0.1)',
    '--red-border':   'rgba(224,108,117,0.22)',
    '--amber':        '#e5c07b',
    '--amber-dim':    'rgba(229,192,123,0.1)',
    '--amber-border': 'rgba(229,192,123,0.22)',
  },
  'Charcoal': {
    label: 'Charcoal',
    '--bg':           '#161616',
    '--bg-1':         '#1c1c1c',
    '--bg-2':         '#242424',
    '--bg-3':         '#2c2c2c',
    '--border':       '#333333',
    '--border-2':     '#3f3f3f',
    '--ink':          '#e8e8e8',
    '--ink-2':        '#909090',
    '--ink-3':        '#555555',
    '--hi':           '#c792ea',
    '--hi-dim':       'rgba(199,146,234,0.1)',
    '--hi-border':    'rgba(199,146,234,0.22)',
    '--green':        '#c3e88d',
    '--green-dim':    'rgba(195,232,141,0.1)',
    '--green-border': 'rgba(195,232,141,0.22)',
    '--red':          '#f07178',
    '--red-dim':      'rgba(240,113,120,0.1)',
    '--red-border':   'rgba(240,113,120,0.22)',
    '--amber':        '#ffcb6b',
    '--amber-dim':    'rgba(255,203,107,0.1)',
    '--amber-border': 'rgba(255,203,107,0.22)',
  },
  'Forest': {
    label: 'Forest',
    '--bg':           '#0d1210',
    '--bg-1':         '#121a16',
    '--bg-2':         '#18221c',
    '--bg-3':         '#1e2b22',
    '--border':       '#253328',
    '--border-2':     '#2f4035',
    '--ink':          '#d0e8d8',
    '--ink-2':        '#7aa088',
    '--ink-3':        '#456050',
    '--hi':           '#6dbf8a',
    '--hi-dim':       'rgba(109,191,138,0.1)',
    '--hi-border':    'rgba(109,191,138,0.22)',
    '--green':        '#a8d8a8',
    '--green-dim':    'rgba(168,216,168,0.1)',
    '--green-border': 'rgba(168,216,168,0.22)',
    '--red':          '#e07878',
    '--red-dim':      'rgba(224,120,120,0.1)',
    '--red-border':   'rgba(224,120,120,0.22)',
    '--amber':        '#d4b06a',
    '--amber-dim':    'rgba(212,176,106,0.1)',
    '--amber-border': 'rgba(212,176,106,0.22)',
  },
  'Rosé': {
    label: 'Rosé',
    '--bg':           '#13100f',
    '--bg-1':         '#1a1614',
    '--bg-2':         '#221c1a',
    '--bg-3':         '#2a2220',
    '--border':       '#342824',
    '--border-2':     '#42322e',
    '--ink':          '#ead8d0',
    '--ink-2':        '#a08880',
    '--ink-3':        '#604848',
    '--hi':           '#e8948a',
    '--hi-dim':       'rgba(232,148,138,0.1)',
    '--hi-border':    'rgba(232,148,138,0.22)',
    '--green':        '#a8c8a0',
    '--green-dim':    'rgba(168,200,160,0.1)',
    '--green-border': 'rgba(168,200,160,0.22)',
    '--red':          '#e06868',
    '--red-dim':      'rgba(224,104,104,0.1)',
    '--red-border':   'rgba(224,104,104,0.22)',
    '--amber':        '#d4a870',
    '--amber-dim':    'rgba(212,168,112,0.1)',
    '--amber-border': 'rgba(212,168,112,0.22)',
  },
};

// ── Theme Application ─────────────────────────────────
const STORAGE_KEY = 'promptlab-theme';

function applyTheme(themeName) {
  const theme = THEMES[themeName];
  if (!theme) return;
  const root = document.documentElement;
  Object.entries(theme).forEach(([key, val]) => {
    if (key.startsWith('--')) root.style.setProperty(key, val);
  });
}

const savedTheme = localStorage.getItem(STORAGE_KEY) || 'Midnight';
applyTheme(savedTheme);

export function setTheme(name) {
  applyTheme(name);
  localStorage.setItem(STORAGE_KEY, name);
}

export function getTheme() {
  return localStorage.getItem(STORAGE_KEY) || 'Midnight';
}

// ── Font & Base Styles ────────────────────────────────
const style = document.createElement('style');
style.innerHTML = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

  :root {
    --font: 'Inter', -apple-system, sans-serif;
    --mono: 'JetBrains Mono', monospace;
    --r:    7px;
    --r-lg: 11px;
    --ease: all 0.15s ease;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { -webkit-font-smoothing: antialiased; }

  body {
    background: var(--bg);
    color: var(--ink);
    font-family: var(--font);
    font-size: 14px;
    line-height: 1.6;
    min-height: 100vh;
    transition: background 0.3s ease, color 0.3s ease;
  }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: var(--border-2); border-radius: 99px; }

  a { color: inherit; text-decoration: none; }
  ::placeholder { color: var(--ink-3) !important; }
  option { background: var(--bg-2); color: var(--ink); }
`;
document.head.appendChild(style);

// ── Base style objects ────────────────────────────────
const S = {
  card: {
    background: 'var(--bg-1)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--r-lg)',
    padding: 18,
    transition: 'border-color 0.15s ease',
  },
  input: {
    width: '100%',
    background: 'var(--bg-2)',
    color: 'var(--ink)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--r)',
    padding: '8px 12px',
    fontFamily: 'var(--font)',
    fontSize: 14,
    outline: 'none',
    transition: 'var(--ease)',
  },
};

// ── Components ────────────────────────────────────────

export function Page({ children, style: s }) {
  return <div style={{ maxWidth: 740, margin: '0 auto', padding: '40px 24px', ...s }}>{children}</div>;
}

export function PageHeader({ title, subtitle, action }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
      <div>
        <h1 style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.3px', color: 'var(--ink)', marginBottom: 3 }}>{title}</h1>
        {subtitle && <p style={{ fontSize: 13, color: 'var(--ink-3)' }}>{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function Card({ children, style: s, accent, onClick }) {
  return (
    <div style={{
      ...S.card,
      ...(accent ? { borderColor: 'var(--hi-border)', boxShadow: '0 0 0 1px var(--hi-border) inset' } : {}),
      ...(onClick ? { cursor: 'pointer' } : {}),
      ...s,
    }}
      onMouseEnter={e => { if (!accent) e.currentTarget.style.borderColor = 'var(--border-2)'; }}
      onMouseLeave={e => { if (!accent) e.currentTarget.style.borderColor = 'var(--border)'; }}
      onClick={onClick}
    >{children}</div>
  );
}

export function Btn({ children, variant = 'secondary', size = 'md', onClick, style: s }) {
  const variants = {
    primary:   { background: 'var(--hi)',       color: 'var(--bg)',    border: '1px solid var(--hi)' },
    secondary: { background: 'var(--bg-2)',      color: 'var(--ink)',   border: '1px solid var(--border-2)' },
    ghost:     { background: 'transparent',      color: 'var(--ink-2)', border: '1px solid transparent' },
    danger:    { background: 'var(--red-dim)',   color: 'var(--red)',   border: '1px solid var(--red-border)' },
    warning:   { background: 'var(--amber-dim)', color: 'var(--amber)', border: '1px solid var(--amber-border)' },
    success:   { background: 'var(--green-dim)', color: 'var(--green)', border: '1px solid var(--green-border)' },
  };
  const sizes = {
    sm: { padding: '5px 11px', fontSize: 12, borderRadius: 'var(--r)' },
    md: { padding: '7px 15px', fontSize: 13, borderRadius: 'var(--r)' },
    lg: { padding: '10px 20px', fontSize: 14, borderRadius: 'var(--r-lg)' },
  };
  return (
    <button onClick={onClick} style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      fontFamily: 'var(--font)', fontWeight: 500, cursor: 'pointer',
      whiteSpace: 'nowrap', transition: 'var(--ease)',
      ...variants[variant], ...sizes[size], ...s,
    }}
      onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(1.12)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
      onMouseLeave={e => { e.currentTarget.style.filter = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}
      onMouseDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
      onMouseUp={e => e.currentTarget.style.transform = 'translateY(-1px)'}
    >{children}</button>
  );
}

export function Input({ placeholder, value, onChange, onKeyDown, style: s }) {
  return (
    <input placeholder={placeholder} value={value} onChange={onChange} onKeyDown={onKeyDown}
      style={{ ...S.input, ...s }}
      onFocus={e => { e.target.style.borderColor = 'var(--hi)'; e.target.style.boxShadow = '0 0 0 3px var(--hi-dim)'; }}
      onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
    />
  );
}

export function Textarea({ placeholder, value, onChange, style: s }) {
  return (
    <textarea placeholder={placeholder} value={value} onChange={onChange}
      style={{ ...S.input, resize: 'vertical', lineHeight: 1.7, ...s }}
      onFocus={e => { e.target.style.borderColor = 'var(--hi)'; e.target.style.boxShadow = '0 0 0 3px var(--hi-dim)'; }}
      onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
    />
  );
}

export function Select({ value, onChange, children, style: s }) {
  return (
    <div style={{ position: 'relative', ...s }}>
      <select value={value} onChange={onChange} style={{
        ...S.input, appearance: 'none', cursor: 'pointer', paddingRight: 32,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%234e5666' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center',
      }}
        onFocus={e => { e.target.style.borderColor = 'var(--hi)'; e.target.style.boxShadow = '0 0 0 3px var(--hi-dim)'; }}
        onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
      >{children}</select>
    </div>
  );
}

export function Badge({ children, variant = 'default' }) {
  const variants = {
    default: { background: 'var(--bg-3)',       color: 'var(--ink-2)', border: '1px solid var(--border)' },
    hi:      { background: 'var(--hi-dim)',      color: 'var(--hi)',    border: '1px solid var(--hi-border)' },
    green:   { background: 'var(--green-dim)',   color: 'var(--green)', border: '1px solid var(--green-border)' },
    amber:   { background: 'var(--amber-dim)',   color: 'var(--amber)', border: '1px solid var(--amber-border)' },
    red:     { background: 'var(--red-dim)',     color: 'var(--red)',   border: '1px solid var(--red-border)' },
  };
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '2px 8px', borderRadius: 99,
      fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 500,
      ...variants[variant],
    }}>{children}</span>
  );
}

export function Alert({ children, variant = 'info' }) {
  const variants = {
    info:    { background: 'var(--hi-dim)',    color: 'var(--hi)',    border: '1px solid var(--hi-border)' },
    success: { background: 'var(--green-dim)', color: 'var(--green)', border: '1px solid var(--green-border)' },
    error:   { background: 'var(--red-dim)',   color: 'var(--red)',   border: '1px solid var(--red-border)' },
    warning: { background: 'var(--amber-dim)', color: 'var(--amber)', border: '1px solid var(--amber-border)' },
  };
  return (
    <div style={{ padding: '10px 14px', borderRadius: 'var(--r)', fontSize: 13, lineHeight: 1.5, ...variants[variant] }}>
      {children}
    </div>
  );
}

export function Divider({ style: s }) {
  return <div style={{ height: 1, background: 'var(--border)', margin: '22px 0', ...s }} />;
}

export function Label({ children, style: s }) {
  return (
    <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: 8, ...s }}>
      {children}
    </p>
  );
}

export function CodeBlock({ children, style: s }) {
  return (
    <pre style={{
      background: 'var(--bg)', border: '1px solid var(--border)',
      borderRadius: 'var(--r)', padding: '14px 16px',
      fontFamily: 'var(--mono)', fontSize: 13, lineHeight: 1.8,
      color: 'var(--ink-2)', whiteSpace: 'pre-wrap', wordBreak: 'break-word',
      overflowY: 'auto', ...s,
    }}>{children}</pre>
  );
}

export function EmptyState({ icon, title, description }) {
  return (
    <div style={{ textAlign: 'center', padding: '52px 24px' }}>
      <div style={{ fontSize: 26, marginBottom: 12, opacity: 0.25 }}>{icon}</div>
      <p style={{ fontWeight: 500, fontSize: 14, color: 'var(--ink-2)', marginBottom: 5 }}>{title}</p>
      <p style={{ fontSize: 13, color: 'var(--ink-3)' }}>{description}</p>
    </div>
  );
}

export function Spinner() {
  return <p style={{ fontSize: 13, color: 'var(--ink-3)', padding: '12px 0' }}>Loading...</p>;
}

// ── Theme Switcher Component ──────────────────────────
import { useState } from 'react';

export function ThemeSwitcher() {
  const [current, setCurrent] = useState(getTheme());
  const [open, setOpen] = useState(false);

  const handleSelect = (name) => {
    setTheme(name);
    setCurrent(name);
    setOpen(false);
  };

  return (
    <div style={{ position: 'relative' }}>
      <button onClick={() => setOpen(v => !v)} style={{
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '5px 10px', borderRadius: 'var(--r)',
        background: 'var(--bg-2)', border: '1px solid var(--border-2)',
        color: 'var(--ink-2)', fontSize: 12, fontFamily: 'var(--font)',
        cursor: 'pointer', transition: 'var(--ease)',
      }}
        onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--hi-border)'}
        onMouseLeave={e => { if (!open) e.currentTarget.style.borderColor = 'var(--border-2)'; }}
      >
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--hi)', display: 'inline-block', flexShrink: 0 }} />
        {current}
        <span style={{ color: 'var(--ink-3)', fontSize: 10 }}>▾</span>
      </button>

      {open && (
        <div style={{
          position: 'absolute', right: 0, top: 'calc(100% + 6px)',
          background: 'var(--bg-1)', border: '1px solid var(--border-2)',
          borderRadius: 'var(--r-lg)', padding: 6, zIndex: 200,
          minWidth: 180, boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
        }}>
          {Object.entries(THEMES).map(([name, theme]) => (
            <button key={name} onClick={() => handleSelect(name)} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              width: '100%', padding: '8px 10px', borderRadius: 'var(--r)',
              background: current === name ? 'var(--hi-dim)' : 'transparent',
              border: `1px solid ${current === name ? 'var(--hi-border)' : 'transparent'}`,
              color: current === name ? 'var(--hi)' : 'var(--ink-2)',
              fontSize: 13, fontFamily: 'var(--font)', cursor: 'pointer',
              transition: 'var(--ease)', textAlign: 'left',
            }}
              onMouseEnter={e => { if (current !== name) { e.currentTarget.style.background = 'var(--bg-3)'; e.currentTarget.style.color = 'var(--ink)'; }}}
              onMouseLeave={e => { if (current !== name) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--ink-2)'; }}}
            >
              {/* Color swatches */}
              <div style={{ display: 'flex', gap: 3, flexShrink: 0 }}>
                {[theme['--hi'], theme['--green'], theme['--amber']].map((color, i) => (
                  <span key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: color, display: 'inline-block' }} />
                ))}
              </div>
              {name}
              {current === name && <span style={{ marginLeft: 'auto', fontSize: 11 }}>✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
