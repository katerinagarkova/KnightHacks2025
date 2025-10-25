import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import App from './App';

let container = document.getElementById("app");
if (!container) {
  throw new Error('Root element with id "app" not found');
}
let root = createRoot(container)
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
