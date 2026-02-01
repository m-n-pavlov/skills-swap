import { createRoot } from 'react-dom/client';
import './app/styles/normalize.css';
import './app/styles/global.css';
import './assets/fonts.css';
import './app/styles/variables.css';
import App from './app/App.tsx';
import { AppProvider } from './app/providers/appProvider.tsx';

async function enableMocking() {
  if (
    import.meta.env.MODE === 'development' ||
    import.meta.env.VITE_ENABLE_MOCKS === 'true'
  ) {
    const { worker } = await import('./mocks/browser');

    return worker.start({
      onUnhandledRequest: 'bypass',
      serviceWorker: {
        url: '/mockServiceWorker.js'
      }
    });
  }
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <AppProvider>
      <App />
    </AppProvider>
  );
});
