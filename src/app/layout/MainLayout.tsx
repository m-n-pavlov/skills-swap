import type { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import clsx from 'clsx';

import { Header } from '../../widgets/Header';
import { Footer } from '../../widgets/Footer';
import { useAutoHideFooter } from '../../shared/hooks/useAutoHideFooter';

import styles from './MainLayout.module.css';
import { useAppDispatch, useAppSelector } from '../../shared/hooks';
import { logout } from '../store/slices/authSlice/authSlice';
import { selectCurrentUser } from '../store/slices/authSlice/authSelector';
import { selectAllCategories } from '../store/slices/categoriesSlice/categoriesSelector';
import { selectSearchQuery } from '../store/slices/filtersSlice/selectors';
import { useFilterActions } from '../store/slices/filtersSlice/useFilterActions';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentUser = useAppSelector(selectCurrentUser);
  const categories = useAppSelector(selectAllCategories);
  const searchQuery = useAppSelector(selectSearchQuery);
  const { setSearchQuery } = useFilterActions();

  const isAuth = Boolean(currentUser);

  const footerVisible = useAutoHideFooter(isHomePage);

  // Базовый класс + модификатор
  const footerWrapperClass = clsx(
    styles.footerWrapper,
    isHomePage
      ? footerVisible
        ? styles.visible
        : styles.hidden
      : styles.visible
  );
  console.log('footerWrapperClass:', footerWrapperClass);

  const handleLogOut = () => {
    if (!currentUser) return;
    dispatch(logout(currentUser.id));
    navigate('/login', { replace: true });
  };

  const handleSearchInputChange = (value: string) => {
    setSearchQuery(value);
  };

  return (
    <div className={styles.layout}>
      <Header
        isAuth={isAuth}
        user={currentUser ?? undefined}
        categories={categories}
        searchQuery={searchQuery}
        hrefAbout='/about'
        hrefRegistration='/registration'
        hrefLogin='/login'
        hrefFaivaritsLink='/favorites'
        hrefProfile='/profile'
        onChangeInput={handleSearchInputChange}
        handleLogOut={handleLogOut}
      />

      <main id='main-content' className={styles.content}>
        {children}
      </main>

      <div className={footerWrapperClass}>
        <Footer />
      </div>
    </div>
  );
};
