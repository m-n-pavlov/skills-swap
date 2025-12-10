import { Header } from '../widgets/Header';
import styles from './app.module.css';

function App() {
  return (
    <>
      <div className={styles.app}>
        <Header isAuth={true} />
      </div>
    </>
  );
}

export default App;
