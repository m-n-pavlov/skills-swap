import type { MenuItem } from '../../shared/ui/ProfileMenuLink/type';

export type UserMenuProps = {
  defaultActiveId?: string;
};

export const menuItems: MenuItem[] = [
  {
    id: 'applications',
    label: 'Заявки',
    iconName: 'request',
    path: '/applications',
    disabled: false
  },
  {
    id: 'trades',
    label: 'Мои обмены',
    iconName: 'messageText',
    path: '/trades',
    disabled: false
  },
  {
    id: 'favorites',
    label: 'Избранное',
    iconName: 'likeEmpty',
    path: '/favorites',
    disabled: false
  },
  {
    id: 'skills',
    label: 'Мои навыки',
    iconName: 'idea',
    path: '/skills',
    disabled: false
  },
  {
    id: 'personalities',
    label: 'Личные данные',
    iconName: 'user',
    path: '/profile',
    disabled: false
  }
];
