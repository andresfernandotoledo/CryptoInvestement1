import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

const container = document.getElementById('root');
if (!container) throw new Error('No se encontró el root');

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>
);
