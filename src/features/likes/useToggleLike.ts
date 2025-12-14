import { useCallback } from 'react';
import { toggleLike } from '../../app/store/slices/authSlice/authSlice';
import {
  selectCurrentUser,
  selectIsAuth
} from '../../app/store/slices/authSlice/authSelector';
import { useAppDispatch, useAppSelector } from '../../shared/hooks';
import type { UseToggleLikeResult } from './type';

export const useToggleLike = (): UseToggleLikeResult => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);
  const isAuth = useAppSelector(selectIsAuth);
  const isLoading = useAppSelector((state) => state.auth.isLoading);
  const error = useAppSelector((state) => state.auth.error);

  // функция проверяет, лайкал ли пользователь cardId
  const isLiked = useCallback(
    (cardId: string): boolean => {
      return currentUser?.likes?.includes(cardId) ?? false;
    },
    [currentUser?.likes] // зависимость только от массива лайков
  );

  const toggleLikeHandler = useCallback(
    async (cardId: string) => {
      if (!isAuth || !currentUser) {
        console.warn('Попытка поставить лайк без авторизации');
        return;
      }

      try {
        await dispatch(toggleLike({ user: currentUser, cardId })).unwrap();
        // После успешного тоггла — Redux обновит currentUser.likes,
        // и isLiked(cardId) автоматически станет актуальным (реактивность!)
      } catch (err) {
        console.error('Ошибка при переключении лайка:', err);
      }
    },
    [dispatch, isAuth, currentUser]
  );

  return {
    toggleLikeHandler,
    isAuth,
    currentUser,
    isLoading,
    error,
    isLiked
  };
};
