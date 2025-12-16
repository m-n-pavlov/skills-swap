import { Navigate } from 'react-router-dom';
import type { ProtectedRouteProps } from './types';

export const ProtectedRoute = ({
  children,
  isAuthenticated,
  redirectTo = '/login'
}: ProtectedRouteProps) => {
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }
  return <>{children}</>;
};
