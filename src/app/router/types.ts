export interface RouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export interface ProtectedRouteProps extends RouteProps {
  isAuthenticated: boolean;
}

export interface PublicRouteProps extends RouteProps {
  isAuthenticated: boolean;
  restricted?: boolean;
}

export type AppRouterProps = {
  isAuth: boolean;
};
