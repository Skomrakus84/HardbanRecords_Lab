import React from 'react';
import ReactDOM from 'react-dom/client';
import SimpleApp from './SimpleApp';
import './styles/globals.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SimpleApp />
  </React.StrictMode>,
);
