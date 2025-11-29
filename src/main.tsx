import { createRoot } from 'react-dom/client';
import './app/styles/normalize.css';
import './app/styles/global.css';
import App from './app/App.tsx';
import { AppProvider } from './app/providers/appProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <AppProvider>
    <App />
  </AppProvider>
);
