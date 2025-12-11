import type { MenuItem } from '../../shared/ui/ProfileMenuLink/type';

export const menuItems: MenuItem[] = [
  {
    id: 'applications',
    label: 'Заявки',
    iconName: 'notification',
    path: '#',
    disabled: false
  },
  {
    id: 'trades',
    label: 'Мои обмены',
    iconName: 'messageText',
    path: '#',
    disabled: false
  },
  {
    id: 'favorites',
    label: 'Избранное',
    iconName: 'like',
    path: '#',
    disabled: false
  },
  {
    id: 'skills',
    label: 'Мои навыки',
    iconName: 'idea',
    path: '#',
    disabled: false
  },
  {
    id: 'personalities',
    label: 'Личные данные',
    iconName: 'user',
    path: '#',
    disabled: false,
    isActive: true
  }
];
