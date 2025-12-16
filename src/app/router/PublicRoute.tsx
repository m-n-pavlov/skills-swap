import { Navigate } from 'react-router-dom';
import type { PublicRouteProps } from './types';

export const PublicRoute = ({
  children,
  isAuthenticated,
  restricted = false,
  redirectTo = '/'
}: PublicRouteProps) => {
  if (restricted && isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }
  return <>{children}</>;
};
