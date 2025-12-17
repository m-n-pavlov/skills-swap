import styles from './app.module.css';
import { useAppDispatch, useAppSelector } from '../shared/hooks';
import { useEffect } from 'react';
import { fetchGetCategories } from './store/slices/categoriesSlice/categoriesSlice.ts';
import { fetchGetCities } from './store/slices/citiesSlice/citiesSlice.ts';
import { fetchGetSkills } from './store/slices/skillsSlice/skillsSlice.ts';
import { fetchGetUsers } from './store/slices/usersSlice/userSlice.ts';
import { MainLayout } from './layout/MainLayout.tsx';
import HomePage from '../pages/HomePage/HomePage.tsx';
import { Route, Routes } from 'react-router-dom';
import { PublicRoute } from './router/PublicRoute.tsx';
import { selectCurrentUser } from './store/slices/authSlice/authSelector.ts';
import AuthLayout from './layout/AuthLayout.tsx';
import AuthPage from '../pages/AuthPage/AuthPage.tsx';
import RegistrationPage from '../pages/RegistrationPage/RegistrationPage.tsx';
import { ProtectedRoute } from './router/ProtectedRoute.tsx';
import { FavoritesPage } from '../pages/FavoritesPage/FavoritesPage.tsx';
import { Person } from '../pages/Person/Person.tsx';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage.tsx';

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
      <Routes>
        {/* Главная */}
        <Route
          path='/'
          element={
            <MainLayout>
              <HomePage />
            </MainLayout>
          }
        />

        {/* Авторизация */}
        <Route
          path='/login'
          element={
            <PublicRoute isAuthenticated={isAuth} restricted>
              <AuthLayout>
                <AuthPage />
              </AuthLayout>
            </PublicRoute>
          }
        />
        <Route
          path='/registration'
          element={
            <PublicRoute isAuthenticated={isAuth} restricted>
              <AuthLayout>
                <RegistrationPage />
              </AuthLayout>
            </PublicRoute>
          }
        />

        {/* Избранное */}
        <Route
          path='/favorites'
          element={
            <ProtectedRoute isAuthenticated={isAuth}>
              <MainLayout>
                <FavoritesPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Профиль */}
        <Route
          path='/profile'
          element={
            <ProtectedRoute isAuthenticated={isAuth}>
              <MainLayout>
                <Person />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Навык */}
        <Route
          path='/skill'
          element={
            <MainLayout>
              <SkillPage />
            </MainLayout>
          }
        />

        {/* 404 */}
        <Route
          path='*'
          element={
            <MainLayout>
              <NotFoundPage />
            </MainLayout>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
