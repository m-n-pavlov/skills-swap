import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../shared/hooks';
import { toggleOffer } from '../../app/store/slices/authSlice/authSlice';
import type { TUseExchangeSystem } from './type';

export const useExchangeSystem = (skillId: string): TUseExchangeSystem => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.currentUser);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const hasOffered = Boolean(currentUser?.exchangeOffers?.includes(skillId));

  const handleOfferExchange = async () => {
    if (!currentUser || hasOffered) return;

    setIsLoading(true);
    try {
      await dispatch(toggleOffer({ user: currentUser, skillId })).unwrap();

      setIsModalOpen(true);
    } catch (error) {
      console.error('Ошибка при создании предложения обмена:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return {
    handleOfferExchange,
    isModalOpen,
    closeModal,
    hasOffered,
    isLoading
  };
};
