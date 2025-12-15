import type { TUser } from '../../entities/users';
import type { TCategory } from '../../entities/categories.ts';

export interface HeaderProps {
  isAuth: boolean;
  user?: TUser;
  categories: TCategory[];
  hrefRegistration: string;
  hrefLogin: string;
  hrefFaivaritsLink: string;
  hrefProfile: string;
  hrefAbout: string;
  onChangeInput: () => void;
  handleLogOut: () => void;
}
