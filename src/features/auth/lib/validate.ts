export const EMAIL_ERROR_TEXT = 'Введите корректный e-mail';
export const PASSWORD_ERROR_TEXT =
  'Пароль должен содержать не менее 8 символов';

export const validateEmail = (value: string): string | null => {
  const trimmed = value.trim();

  if (!trimmed) {
    return EMAIL_ERROR_TEXT;
  }

  const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegExp.test(trimmed)) {
    return EMAIL_ERROR_TEXT;
  }

  return null;
};

export const validatePassword = (value: string): string | null => {
  const trimmed = value.trim();

  if (!trimmed) {
    return PASSWORD_ERROR_TEXT;
  }

  if (trimmed.length < 8) {
    return PASSWORD_ERROR_TEXT;
  }

  return null;
};
