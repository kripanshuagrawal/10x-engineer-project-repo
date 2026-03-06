import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CollectionProvider } from './contexts/CollectionContext.jsx'
import { PromptProvider } from './contexts/PromptContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CollectionProvider>
      <PromptProvider>
        <App />
      </PromptProvider>
    </CollectionProvider>
  </StrictMode>,
)
