// Entry point for the build script in your package.json
import '@hotwired/turbo-rails';
import 'react-toastify/dist/ReactToastify.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { Root } from './Core/Root';

document.addEventListener('DOMContentLoaded', () => {
  const rootEl = document.getElementById('root');
  const root = ReactDOM.createRoot(rootEl!);

  root.render(
    <React.StrictMode>
      <Root />
    </React.StrictMode>
  );
});
