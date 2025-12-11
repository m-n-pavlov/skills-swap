import styles from './app.module.css';
import RegistrationPage from '../pages/RegistrationPage/RegistrationPage.tsx';

function App() {
  return (
    <>
      <RegistrationPage />
      <div className={styles.app}></div>
    </>
  );
}

export default App;
