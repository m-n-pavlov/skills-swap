import type { TUser } from '../../entities/users';

export interface HeaderProps {
  isAuth: boolean;
  user?: TUser;
}
