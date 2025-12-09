import type { MenuItem } from '../ProfileMenuLink/ProfileMenuLink';
import { Icon } from '../Icon';

export const MenuItems: MenuItem[] = [
  {
    id: 'applications',
    label: 'Заявки',
    icon: <Icon name='notification' alt='иконка уведомления' />,
    path: '#',
    disabled: false
  },
  {
    id: 'trades',
    label: 'Мои обмены',
    icon: <Icon name='messageText' alt='иконка сообщения' />,
    path: '#',
    disabled: false
  },
  {
    id: 'favorites',
    label: 'Избранное',
    icon: <Icon name='like' alt='иконка сердца' />,
    path: '#',
    disabled: false,
    isActive: false
  },
  {
    id: 'skills',
    label: 'Мои навыки',
    icon: <Icon name='idea' alt='иконка лампочки' />,
    path: '#',
    disabled: false
  },
  {
    id: 'personalities',
    label: 'Личные данные',
    icon: <Icon name='user' alt='иконка фигуры пользователя' />,
    path: '#',
    disabled: false,
    isActive: true
  }
];
