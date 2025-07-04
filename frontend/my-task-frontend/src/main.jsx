import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Estilos globales con Tailwind
import { BrowserRouter } from 'react-router-dom';
import { registerSW } from 'virtual:pwa-register';

registerSW();
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
