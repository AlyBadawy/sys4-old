import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { App } from './App';

document.addEventListener('DOMContentLoaded', () => {
  const rootEl = document.getElementById('root');
  const root = ReactDOM.createRoot(rootEl!);

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
