import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { TransitionManager } from './components/TransitionManager';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <TransitionManager>
        <App />
      </TransitionManager>
    </BrowserRouter>
  </React.StrictMode>
);
