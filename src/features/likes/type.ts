import type { TAuthUser } from '../../entities/authUser';

export type UseToggleLikeResult = {
  toggleLikeHandler: (cardId: string) => Promise<void>;
  isAuth: boolean;
  currentUser: TAuthUser | null;
  isLoading: boolean;
  error: string | null;
  isLiked: (cardId: string) => boolean;
};
