import type { TUser } from '../../entities/users';
import type { TCategory } from '../../entities/categories.ts';

export interface HeaderProps {
  isAuth: boolean;
  user?: TUser;
  categories: TCategory[];
  onChangeInput: () => void;
  hrefRegistration: string;
  hrefLogin: string;
  hrefFaivaritsLink: string;
}
