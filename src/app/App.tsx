import styles from './app.module.css';
import { useAppDispatch } from '../shared/hooks';
import { useEffect } from 'react';
import { fetchGetCategories } from './store/slices/categoriesSlice/categoriesSlice.ts';
import { fetchGetCities } from './store/slices/citiesSlice/citiesSlice.ts';
import { fetchGetSkills } from './store/slices/skillsSlice/skillsSlice.ts';
import { fetchGetUsers } from './store/slices/usersSlice/userSlice.ts';
import HomePage from '../pages/HomePage/HomePage.tsx';

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchGetCategories());
    dispatch(fetchGetCities());
    dispatch(fetchGetSkills());
    dispatch(fetchGetUsers());
  }, [dispatch]);

  return (
    <>
      <div className={styles.app}>
        <HomePage />
      </div>
    </>
  );
}

export default App;
