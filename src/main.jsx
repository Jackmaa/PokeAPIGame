import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { TransitionManager } from './components/TransitionManager';
import './index.css';
import { ComparisonProvider } from './context/ComparisonContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ComparisonProvider>
        <TransitionManager>
          <App />
        </TransitionManager>
      </ComparisonProvider>
    </BrowserRouter>
  </React.StrictMode>
);
