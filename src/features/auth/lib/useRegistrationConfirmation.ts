import { useState, useCallback, useRef } from 'react';
import type { SyntheticEvent } from 'react';
import { useNavigate, useLocation, type Location } from 'react-router-dom';

import { useAppSelector } from '../../../shared/hooks';
import {
  selectRegistration,
  selectRegistrationSummary
} from '../../../app/store/slices/registration/registrationSelectors';
// import { useAppDispatch } from '../../../shared/hooks';
// import { registerUser } from '../../../app/store/slices/authSlice/authSlice';
// import { selectAuthError, selectAuthIsLoading } from '../../../app/store/slices/authSlice/authSelector';

import type { RegistrationSummary } from '../../../app/store/slices/registration/registrationSlice';
import { AUTH_REDIRECT_AFTER_LOGIN } from '../../../features/auth/config/authConfig';

type LocationState = { from?: Location };

export const useRegistrationConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // когда API будет готово
  // const dispatch = useAppDispatch();
  // const isAuthLoading = useAppSelector(selectAuthIsLoading);
  // const authError = useAppSelector(selectAuthError);

  const registrationState = useAppSelector(selectRegistration);
  const summary: RegistrationSummary = useAppSelector(
    selectRegistrationSummary
  );

  const { step1, step2, step3 } = registrationState;

  const [isOpen, setIsOpen] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const submitting = useRef(false);

  const openModal = useCallback(() => {
    setLocalError(null);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setLocalError(null);
  }, []);

  const getRedirectPath = (): string => {
    const state = location.state as LocationState | null;

    if (state?.from?.pathname) {
      return state.from.pathname;
    }

    return AUTH_REDIRECT_AFTER_LOGIN;
  };

  const areAllStepsFilled = (): boolean => {
    if (!step1) return false;
    if (!step1.email || !step1.password) return false;
    if (!step2) return false;
    if (!step3) return false;

    return true;
  };

  // Подтверждение регистрации (пока MOCK)
  const handleConfirm = useCallback(
    async (e?: SyntheticEvent) => {
      e?.preventDefault();

      if (submitting.current) return;
      submitting.current = true;
      setLocalError(null);

      if (!areAllStepsFilled()) {
        setLocalError('Похоже, заполнены не все шаги регистрации');
        submitting.current = false;
        return;
      }

      const payload = {
        email: step1.email,
        password: step1.password,
        profile: {
          name: step2!.name,
          date: step2!.date,
          gender: step2!.gender,
          city: step2!.city,
          categories: step2!.categories,
          subCategories: step2!.subCategories,
          avatar: step2!.avatar
        },
        skill: {
          skillName: step3!.skillName,
          skillCategory: step3!.skillCategory,
          skillSubCategory: step3!.skillSubCategory,
          description: step3!.description,
          images: step3!.images
        }
      };

      // Пока API нет — просто лог и редирект
      // заменить на реальный вызов:
      // const resultAction = await dispatch(registerUser(payload));
      // if (registerUser.fulfilled.match(resultAction)) { ... } else { ... }

      // eslint-disable-next-line no-console
      console.log('MOCK REGISTER PAYLOAD:', payload);

      const redirectTo = getRedirectPath();
      setIsOpen(false);
      navigate(redirectTo, { replace: true });

      submitting.current = false;
    },
    [step1, step2, step3, navigate, location]
  );

  // 6. Пока API нет — считаем, что isLoading = false, serverError = null
  const isSubmitting = false;
  const serverError: string | null = null;

  return {
    isOpen,
    openModal,
    closeModal,
    summary,
    isSubmitting,
    localError,
    serverError,
    handleConfirm
  };
};
