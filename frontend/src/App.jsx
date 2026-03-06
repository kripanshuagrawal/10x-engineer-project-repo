import React, { useState } from 'react';  // Correct import of React and useState
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import PromptsPage from './pages/PromptsPage.jsx';  // Ensure the file path is correct

function App() {
  const [count, setCount] = useState(0);  // Properly using useState at top level in the functional component

  return (
    <Router>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      
        <Routes>
          {/* Ensure no nested hooks/helpers below */}
          <Route
            path="/"
            element={
              <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                  count is {count}
                </button>
                <p>Edit <code>src/App.jsx</code> and save to test HMR</p>
              </div>
            }
          />
          <Route path="/prompts" element={<PromptsPage />} />
        </Routes>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </Router>
  );
}

export default App;