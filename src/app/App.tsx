import styles from './app.module.css';
import { UserMenu } from '../shared/ui/UserMenu/UserMenu';

function App() {
  return (
    <>
      <div className={styles.app}>
        <UserMenu />
      </div>
    </>
  );
}

export default App;
