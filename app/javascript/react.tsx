import '@hotwired/turbo-rails';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { AppRoot } from './Core/AppRoot';
import 'react-toastify/dist/ReactToastify.css';

document.addEventListener('DOMContentLoaded', () => {
  const rootEl = document.getElementById('root');
  const root = ReactDOM.createRoot(rootEl!);

  root.render(
    <React.StrictMode>
      <AppRoot />
    </React.StrictMode>
  );
});
