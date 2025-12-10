import type { AvatarProps } from '../Avatar/type';
import type { TUser } from '../../../entities/users.ts';

export type UserCardProps = {
  user: TUser;
  avatar: Omit<AvatarProps, 'avatarUrl'>; // можно сделать опциональным для рендера всех карточек
  className?: string;
  showLinkButton?: boolean; // (true - показываем кнопку "Подробнее", false или не передан - скрываем)
  onLike?: (userId: string) => void; // обработчик клика на иконку лайка
  onMore?: (userId: string) => void; // обработчик клика на кнопку "Подробнее"
};
