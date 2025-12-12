import { useState, useCallback, useRef } from 'react';
import type { SyntheticEvent } from 'react';

import { validateEmail, validatePassword } from './validate';

import { useAppDispatch, useAppSelector } from '../../../shared/hooks';
import { saveStep1 } from '../../../app/store/slices/registration/registrationSlice';
import { selectRegistration } from '../../../app/store/slices/registration/registrationSelectors';

// временная заглушка API проверки email
const mockCheckEmail = async (
  email: string
): Promise<{ available: boolean }> => {
  return new Promise<{ available: boolean }>((resolve) => {
    console.log('checking', email);
    setTimeout(() => resolve({ available: true }), 500);
  });
};

export const useStep1Form = () => {
  const dispatch = useAppDispatch();

  // Достаём уже заполненные значения (если есть)
  const {
    step1,
    isLoading,
    error: serverError
  } = useAppSelector(selectRegistration);

  // Локальный стейт
  const [email, setEmail] = useState(step1.email);
  const [password, setPassword] = useState(step1.password);

  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [isEmailAvailable, setIsEmailAvailable] = useState<boolean | null>(
    null
  );

  // защита от двойного сабмита
  const submitting = useRef(false);

  // --- обработчики изменений ------------------
  const handleEmailChange = useCallback((value: string) => {
    setEmail(value);
    setEmailError(validateEmail(value));
    setIsEmailAvailable(null); // сбрасываем результат проверки email при каждом изменении
  }, []);

  const handlePasswordChange = useCallback((value: string) => {
    setPassword(value);
    setPasswordError(validatePassword(value));
  }, []);

  // --- отправка формы шага 1 -----------------
  const handleSubmit = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();

      if (submitting.current || isLoading) return;
      submitting.current = true;

      // 1. Валидируем поля
      const emailErr = validateEmail(email);
      const passwordErr = validatePassword(password);

      setEmailError(emailErr);
      setPasswordError(passwordErr);

      if (emailErr || passwordErr) {
        submitting.current = false;
        return;
      }

      // 2. Проверка email через API (пока mock)
      setIsCheckingEmail(true);
      const result = await mockCheckEmail(email);
      setIsCheckingEmail(false);

      if (!result.available) {
        setEmailError('Этот email уже занят');
        setIsEmailAvailable(false);
        submitting.current = false;
        return;
      }

      setIsEmailAvailable(true);

      // 3. Сохраняем данные шага 1 в Redux
      dispatch(saveStep1({ email, password }));

      submitting.current = false;
    },
    [email, password, isLoading, dispatch]
  );

  // --- доступность кнопки "Далее" ---
  const isFormValid =
    !emailError &&
    !passwordError &&
    email.trim() !== '' &&
    password.trim() !== '' &&
    !isCheckingEmail;

  return {
    email,
    password,
    emailError,
    passwordError,
    serverError,

    isCheckingEmail,
    isEmailAvailable,

    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
    isFormValid
  };
};
