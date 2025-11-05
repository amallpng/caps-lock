
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { SettingsProvider } from './contexts/SettingsContext';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    {/* FIX: Add SettingsProvider to manage sound settings globally. */}
    <SettingsProvider>
      <App />
    </SettingsProvider>
  </React.StrictMode>
);