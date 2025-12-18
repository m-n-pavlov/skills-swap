import { useLocation, useNavigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useAppSelector } from '../../shared/hooks';
import { AuthHeader } from '../../widgets/AuthHeader';

export default function AuthLayout({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAppSelector((state) => state.auth);

  // Извлекаем "from" из состояния навигации
  const fromPath = (location.state as { from?: string })?.from || '/';

  const isProtectedRoute = (path: string): boolean => {
    return path.startsWith('/profile');
  };

  const handleClose = () => {
    if (isProtectedRoute(fromPath) && !currentUser) {
      navigate('/', { replace: true });
    } else {
      navigate(fromPath, { replace: true });
    }
  };

  return (
    <>
      <AuthHeader onClose={handleClose} />
      <main>{children}</main>
    </>
  );
}
