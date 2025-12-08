import type { AvatarProps } from '../Avatar/type';

export type UserCardProps = {
  user: TUser;
  avatar: Omit<AvatarProps, 'avatarUrl'>; // можно сделать опциональным для рендера всех карточек
  className?: string;
  showLinkButton?: boolean; // (true - показываем кнопку "Подробнее", false или не передан - скрываем)
  onLike?: (userId: string) => void; // обработчик клика на иконку лайка
  onMore?: (userId: string) => void; // обработчик клика на кнопку "Подробнее"
};

export type TUser = {
  id: string;
  name: string;
  avatarUrl: string;
  cityId: string;
  gender: 'male' | 'female';
  birthday: string;
  skillsTeach: string[];
  skillsLearn: string[];
  likes: number;
  createdAt: string;
};
