import { useCallback, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate, type Location } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../shared/hooks';

import {
  selectRegistration,
  selectRegistrationSummary
} from '../../../app/store/slices/registration/registrationSelectors';

import { register } from '../../../app/store/slices/authSlice/authSlice';
import {
  selectAuthLoading,
  selectAuthError
} from '../../../app/store/slices/authSlice/authSelector';

import { AUTH_REDIRECT_AFTER_LOGIN } from '../config/authConfig';

import type { TRegisterPayload } from '../../../api/auth/authRegistration';
import type { TSkill } from '../../../entities/skills';

type LocationState = { from?: Location };

export const useRegistrationConfirmation = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation() as Location & { state?: LocationState };

  const registration = useAppSelector(selectRegistration);
  const summary = useAppSelector(selectRegistrationSummary);

  const isSubmitting = useAppSelector(selectAuthLoading);
  const serverError = useAppSelector(selectAuthError);

  const [isOpen, setIsOpen] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const submitting = useRef(false);

  const redirectTo =
    location.state?.from?.pathname || AUTH_REDIRECT_AFTER_LOGIN;

  const openModal = useCallback(() => {
    setLocalError(null);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setLocalError(null);
    setIsOpen(false);
  }, []);

  const areAllStepsFilled = useCallback(() => {
    const { step1, step2, step3 } = registration;
    return Boolean(
      step1?.email &&
      step1?.password &&
      step2 &&
      step3 &&
      step3.images &&
      step3.images.length > 0
    );
  }, [registration]);

  const payload: TRegisterPayload | null = useMemo(() => {
    const { step1, step2, step3 } = registration;
    if (!step1?.email || !step1?.password || !step2 || !step3) return null;

    const skillsTeach: TSkill = {
      id: 'temp-skill',
      name: step3.skillName,
      shortDescription: step3.skillName,
      description: step3.description,
      categoryId: step3.skillCategory,
      subcategoryId: step3.skillSubCategory,
      images: []
    };

    return {
      email: step1.email,
      password: step1.password,

      name: step2.name,
      birthday: step2.date,
      gender: step2.gender,
      cityId: step2.city,

      description: '',

      learningCategoryId: step2.categories,
      learningSubCategoryId: step2.subCategories,

      skillsTeach,
      avatarFile: step2.avatar,
      skillsImageFile: step3.images?.[0] ?? null
    };
  }, [registration]);

  const handleConfirm = useCallback(async () => {
    if (submitting.current || isSubmitting) return;
    submitting.current = true;
    setLocalError(null);

    try {
      if (!areAllStepsFilled()) {
        setLocalError('Похоже, заполнены не все шаги регистрации');
        return;
      }

      if (!payload) {
        setLocalError('Не удалось собрать данные регистрации');
        return;
      }

      await dispatch(register(payload)).unwrap();

      setIsOpen(false);
      navigate(redirectTo, { replace: true });
    } catch {
    } finally {
      submitting.current = false;
    }
  }, [
    areAllStepsFilled,
    payload,
    dispatch,
    isSubmitting,
    navigate,
    redirectTo
  ]);

  return {
    isOpen,
    openModal,
    closeModal,

    summary,

    isSubmitting,
    serverError,
    localError,

    handleConfirm
  };
};
