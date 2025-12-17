import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';

import { Header } from '../../widgets/Header';
import { Footer } from '../../widgets/Footer';
import { useAutoHideFooter } from '../../shared/hooks/useAutoHideFooter';

import styles from './MainLayout.module.css';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

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

  return (
    <div className={styles.layout}>
      <Header
        isAuth={false}
        user={undefined}
        categories={[]}
        hrefAbout='/about'
        hrefRegistration='/registration'
        hrefLogin='/login'
        hrefFaivaritsLink='/favorites'
        hrefProfile='/profile'
        onChangeInput={() => {}}
        handleLogOut={() => {}}
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
