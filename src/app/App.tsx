import styles from './app.module.css';
import AuthPage from '../pages/AuthPage/AuthPage.tsx';

function App() {
  return (
    <>
      <div className={styles.app}></div>
      <AuthPage />
    </>
  );
}

export default App;
