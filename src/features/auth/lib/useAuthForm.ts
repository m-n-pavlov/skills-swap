import { useState, useCallback, useRef } from 'react';
import type { SyntheticEvent } from 'react';
import { useNavigate, useLocation, type Location } from 'react-router-dom';
import { validateEmail, validatePassword } from './validate';
import { AUTH_REDIRECT_AFTER_LOGIN } from '../config/authConfig';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks';
import { login } from '../../../app/store/slices/authSlice/authSlice';
import {
  selectAuthLoading,
  selectAuthError
} from '../../../app/store/slices/authSlice/authSelector';

type LocationState = { from?: Location };

export const useAuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const submitting = useRef(false);

  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectAuthLoading);
  const serverError = useAppSelector(selectAuthError);

  const navigate = useNavigate();
  const location = useLocation() as Location & { state?: LocationState };
  const from = location.state?.from?.pathname || AUTH_REDIRECT_AFTER_LOGIN;

  const handleEmailChange = useCallback((value: string) => {
    setEmail(value);
    setEmailError(validateEmail(value));
  }, []);

  const handlePasswordChange = useCallback((value: string) => {
    setPassword(value);
    setPasswordError(validatePassword(value));
  }, []);

  const handleSubmit = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();

      if (submitting.current || isLoading) return;
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
        await dispatch(login({ login: email, password })).unwrap();
        navigate(from, { replace: true });
      } catch {
      } finally {
        submitting.current = false;
      }
    },
    [dispatch, email, password, from, navigate, isLoading]
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
