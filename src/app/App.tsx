import { Routes, Route } from 'react-router-dom';
import styles from './app.module.css';

import AuthPage from '../pages/AuthPage/AuthPage';
import RegistrationPage from '../pages/RegistrationPage/RegistrationPage';

function App() {
  return (
    <>
      <div className={styles.app}>
        <Routes>
          <Route path='/login' element={<AuthPage />} />
          <Route path='/register' element={<RegistrationPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
