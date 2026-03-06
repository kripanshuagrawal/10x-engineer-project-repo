import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import PromptsPage from './pages/PromptsPage';
import PromptDetailPage from './pages/PromptDetailPage';
import CollectionsPage from './pages/CollectionsPage';
import { ThemeSwitcher } from './components/ui.jsx';

function Navbar() {
  const { pathname } = useLocation();
  const isActive = (path) => path === '/' ? pathname === '/' : pathname.startsWith(path);

  return (
    <header style={{
      background: 'rgba(var(--bg), 0.85)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border)',
      position: 'sticky', top: 0, zIndex: 100,
      backgroundColor: 'var(--bg-1)',
    }}>
      <div style={{ maxWidth: 740, margin: '0 auto', padding: '0 24px', height: 52, display: 'flex', alignItems: 'center', gap: 6 }}>

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginRight: 20 }}>
          <div style={{ width: 26, height: 26, background: 'var(--hi)', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: 'var(--bg)', fontWeight: 700 }}>⚡</div>
          <span style={{ fontWeight: 600, fontSize: 14, letterSpacing: '-0.3px', color: 'var(--ink)', fontFamily: 'var(--font)' }}>PromptLab</span>
        </div>

        {/* Nav links */}
        <nav style={{ display: 'flex', gap: 2, flex: 1 }}>
          {[['/', 'Prompts'], ['/collections', 'Collections']].map(([path, label]) => (
            <Link key={path} to={path} style={{
              padding: '5px 12px', borderRadius: 'var(--r)',
              fontSize: 13, fontWeight: 500, fontFamily: 'var(--font)',
              transition: 'var(--ease)',
              background: isActive(path) ? 'var(--bg-2)' : 'transparent',
              color: isActive(path) ? 'var(--ink)' : 'var(--ink-2)',
              border: `1px solid ${isActive(path) ? 'var(--border-2)' : 'transparent'}`,
            }}>{label}</Link>
          ))}
        </nav>

        {/* Theme switcher */}
        <ThemeSwitcher />
      </div>
    </header>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<PromptsPage />} />
        <Route path="/prompts/:id" element={<PromptDetailPage />} />
        <Route path="/collections" element={<CollectionsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
