import { createRoot } from 'react-dom/client';
import './app/styles/normalize.css';
import './app/styles/global.css';
import './assets/fonts.css';
import './app/styles/variables.css';
import App from './app/App.tsx';
import { AppProvider } from './app/providers/appProvider.tsx';

async function enableMocking() {
  if (import.meta.env.MODE === 'development') {
    const { worker } = await import('./mocks/browser');

    await worker.start({
      onUnhandledRequest: 'bypass'
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
