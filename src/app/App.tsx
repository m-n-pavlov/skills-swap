import styles from './app.module.css';
import { useAppDispatch, useAppSelector } from '../shared/hooks';
import { useEffect } from 'react';
import { fetchGetCategories } from './store/slices/categoriesSlice/categoriesSlice.ts';
import { fetchGetCities } from './store/slices/citiesSlice/citiesSlice.ts';
import { fetchGetSkills } from './store/slices/skillsSlice/skillsSlice.ts';
import { fetchGetUsers } from './store/slices/usersSlice/userSlice.ts';
import { selectCurrentUser } from './store/slices/authSlice/authSelector.ts';
import { AppRouter } from './router/AppRouter.tsx';

function App() {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);
  const isAuth = Boolean(currentUser);

  useEffect(() => {
    dispatch(fetchGetCategories());
    dispatch(fetchGetCities());
    dispatch(fetchGetSkills());
    dispatch(fetchGetUsers());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppRouter isAuth={isAuth} />
    </div>
  );
}

export default App;
