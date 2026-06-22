import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import { LangProvider } from './content/i18n';
import './theme/global.css';

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

// Restore a deep link captured by the static-host 404.html SPA fallback.
const redirect = sessionStorage.getItem('da_redirect');
if (redirect) {
  sessionStorage.removeItem('da_redirect');
  if (redirect !== window.location.pathname) {
    window.history.replaceState(null, '', redirect);
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <LangProvider>
        <BrowserRouter basename={base}>
          <App />
        </BrowserRouter>
      </LangProvider>
    </HelmetProvider>
  </React.StrictMode>
);
