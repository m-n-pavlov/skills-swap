import type { TCategory } from '../../entities/categories.ts';
import type { TAuthUser } from '../../entities/authUser.ts';
import type { ChangeEvent } from 'react';

export interface HeaderProps {
  isAuth: boolean;
  user?: TAuthUser;
  categories: TCategory[];
  searchQuery: string;
  hrefRegistration: string;
  hrefLogin: string;
  hrefFaivaritsLink: string;
  hrefProfile: string;
  hrefAbout: string;
  onChangeInput: (value: string) => void;
  handleLogOut: () => void;
}
