// src/features/auth/lib/useAuthForm.ts

import { useState, useCallback, useRef } from 'react';
import type { SyntheticEvent } from 'react';
import { useNavigate, useLocation, type Location } from 'react-router-dom';

import { validateEmail, validatePassword } from './validate';
import { AUTH_REDIRECT_AFTER_LOGIN } from '../config/authConfig';

// поправь путь под свой проект, если alias '@' не настроен
import { useAppDispatch, useAppSelector } from '../../../shared/hooks';
import { loginUser } from '../../../app/store/slices/authSlice/authSlice';

type LocationState = { from?: Location };

export const useAuthForm = () => {
  // 1. Управление состоянием формы (email, password)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // локальные ошибки валидации
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  // защита от двойного сабмита
  const submitting = useRef(false);

  // 4. Интеграция с Redux
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.auth.isLoading);
  const serverError = useAppSelector((state) => state.auth.error);

  // навигация и "откуда пришёл"
  const navigate = useNavigate();
  const location = useLocation() as Location & { state?: LocationState };
  const from = location.state?.from?.pathname || AUTH_REDIRECT_AFTER_LOGIN;

  // 2. Валидация + обработка изменений email
  const handleEmailChange = useCallback((value: string) => {
    setEmail(value);
    setEmailError(validateEmail(value));
  }, []);

  // 2. Валидация + обработка изменений пароля
  const handlePasswordChange = useCallback((value: string) => {
    setPassword(value);
    setPasswordError(validatePassword(value));
  }, []);

  // 3. Обработка отправки формы с вызовом API (loginUser)
  const handleSubmit = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();

      if (submitting.current || isLoading) return;
      submitting.current = true;

      // финальная валидация перед "API"
      const emailErr = validateEmail(email);
      const passwordErr = validatePassword(password);

      setEmailError(emailErr);
      setPasswordError(passwordErr);

      if (emailErr || passwordErr) {
        submitting.current = false;
        return;
      }

      try {
        // вызов "API" через Redux-thunk
        await dispatch(loginUser({ login: email, password })).unwrap();

        // редирект после успешного входа
        navigate(from, { replace: true });
      } catch (err) {
        // текст ошибки уже пришёл в authSlice.error → serverError
        console.error('Ошибка входа:', err);
      } finally {
        submitting.current = false;
      }
    },
    [email, password, dispatch, from, navigate, isLoading]
  );

  const isFormValid =
    !emailError &&
    !passwordError &&
    email.trim() !== '' &&
    password.trim() !== '';

  return {
    email,
    password,
    emailError,
    passwordError,
    isLoading,
    serverError,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
    isFormValid
  };
};
