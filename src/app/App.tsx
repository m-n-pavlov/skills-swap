import styles from './app.module.css';
import { Header } from '../widgets/header';

function App() {
  return (
    <>
      <div className={styles.app}></div>
      <Header isAuth={false}></Header>
    </>
  );
}

export default App;
