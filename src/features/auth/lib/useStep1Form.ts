import { useState, useCallback, useRef, useEffect } from 'react';
import type { SyntheticEvent } from 'react';

import { validateEmail, validatePassword } from './validate';

import { useAppDispatch, useAppSelector } from '../../../shared/hooks';
import {
  saveStep1,
  setError,
  clearError,
  setLoading
} from '../../../app/store/slices/registration/registrationSlice';
import { selectRegistration } from '../../../app/store/slices/registration/registrationSelectors';

import { checkEmailApi } from '../../../api/auth/authRegistration';

export const useStep1Form = () => {
  const dispatch = useAppDispatch();

  const {
    step1,
    isLoading,
    error: serverError,
    currentStep
  } = useAppSelector(selectRegistration);

  const [email, setEmail] = useState(step1.email);
  const [password, setPassword] = useState(step1.password);

  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [isEmailAvailable, setIsEmailAvailable] = useState<boolean | null>(
    null
  );

  const submitting = useRef(false);

  useEffect(() => {
    if (currentStep === 1) {
      setEmail(step1.email);
      setPassword(step1.password);
      setIsEmailAvailable(null);
      setEmailError(null);
      setPasswordError(null);
    }
  }, [currentStep, step1.email, step1.password]);

  const handleEmailChange = useCallback(
    (value: string) => {
      setEmail(value);
      setEmailError(validateEmail(value));
      setIsEmailAvailable(null);
      dispatch(clearError());
    },
    [dispatch]
  );

  const handlePasswordChange = useCallback(
    (value: string) => {
      setPassword(value);
      setPasswordError(validatePassword(value));
      dispatch(clearError());
    },
    [dispatch]
  );

  const handleSubmit = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();

      if (submitting.current || isLoading || isCheckingEmail) return;
      submitting.current = true;

      const emailErr = validateEmail(email);
      const passwordErr = validatePassword(password);

      setEmailError(emailErr);
      setPasswordError(passwordErr);

      if (emailErr || passwordErr) {
        submitting.current = false;
        return;
      }

      try {
        setIsCheckingEmail(true);
        dispatch(setLoading(true));

        const exists = await checkEmailApi(email.trim());

        if (exists) {
          setIsEmailAvailable(false);
          setEmailError('Этот email уже занят');
          dispatch(setError('Этот email уже занят'));
          return;
        }

        setIsEmailAvailable(true);
        dispatch(clearError());

        dispatch(saveStep1({ email: email.trim(), password }));
      } catch (err: any) {
        dispatch(setError(err?.message ?? 'Ошибка проверки email'));
      } finally {
        setIsCheckingEmail(false);
        dispatch(setLoading(false));
        submitting.current = false;
      }
    },
    [email, password, dispatch, isLoading, isCheckingEmail]
  );

  const isFormValid =
    !validateEmail(email) &&
    !validatePassword(password) &&
    email.trim() !== '' &&
    password.trim() !== '' &&
    !isCheckingEmail &&
    isEmailAvailable !== false;

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

export default useStep1Form;
