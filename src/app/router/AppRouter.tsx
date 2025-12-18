import type { AppRouterProps } from './types';
import { Route, Routes } from 'react-router-dom';
import { MainLayout } from '../layout/MainLayout.tsx';
import HomePage from '../../pages/HomePage/HomePage.tsx';
import { PublicRoute } from './PublicRoute.tsx';
import AuthLayout from '../layout/AuthLayout.tsx';
import AuthPage from '../../pages/AuthPage/AuthPage.tsx';
import RegistrationPage from '../../pages/RegistrationPage/RegistrationPage.tsx';
import { ProtectedRoute } from './ProtectedRoute.tsx';
import { FavoritesPage } from '../../pages/FavoritesPage/FavoritesPage.tsx';
import { Person } from '../../pages/Person';
import { PersonNotFoundPage } from '../../pages/PersonNotFoundPage';
import { SkillPage } from '../../pages/SkillPage/SkillPage.tsx';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage.tsx';

export const AppRouter = ({ isAuth }: AppRouterProps) => {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <MainLayout>
            <HomePage />
          </MainLayout>
        }
      />

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

      <Route
        path='/applications'
        element={
          <ProtectedRoute isAuthenticated={isAuth}>
            <MainLayout>
              <PersonNotFoundPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path='/trades'
        element={
          <ProtectedRoute isAuthenticated={isAuth}>
            <MainLayout>
              <PersonNotFoundPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path='/skills'
        element={
          <ProtectedRoute isAuthenticated={isAuth}>
            <MainLayout>
              <PersonNotFoundPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path='/skill/:userId'
        element={
          <MainLayout>
            <SkillPage />
          </MainLayout>
        }
      />

      <Route
        path='*'
        element={
          <MainLayout>
            <NotFoundPage />
          </MainLayout>
        }
      />
    </Routes>
  );
};
