import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { S4Routes } from './components/core/S4Routes';

document.addEventListener('DOMContentLoaded', () => {
  const rootEl = document.getElementById('react-root');
  const root = ReactDOM.createRoot(rootEl!);
  root.render(
    <React.StrictMode>
      <S4Routes />
    </React.StrictMode>
  );
});
