import type { AvatarProps } from '../Avatar/type';
import type { TUserWithDetails } from '../../../features/users';

export type UserCardProps = {
  user: TUserWithDetails;
  avatar?: Omit<AvatarProps, 'avatarUrl'>; // можно сделать опциональным для рендера всех карточек
  className?: string;
  showLinkButton?: boolean; // (true - показываем кнопку "Подробнее", false или не передан - скрываем)
  onLike?: (userId: string) => void; // обработчик клика на иконку лайка
  onMore?: (userId: string) => void; // обработчик клика на кнопку "Подробнее"
};
