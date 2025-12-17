import type { PersonFormErrors, PersonFormValue } from '../ui/type';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validatePersonForm = (
  v: PersonFormValue,
  opts?: { validatePassword?: boolean }
): PersonFormErrors => {
  const errors: PersonFormErrors = {};
  const validatePassword = opts?.validatePassword ?? true;

  if (!v.email.trim()) errors.email = 'Email (обязательное поле)';
  else if (!EMAIL_RE.test(v.email.trim()))
    errors.email = 'Email (должен включать @)';

  if (!v.name.trim()) errors.name = 'Введите имя';
  else if (v.name.trim().length < 2) errors.name = 'Имя слишком короткое';

  if (validatePassword && v.password) {
    if (v.password.length < 8)
      errors.password = 'Пароль должен быть не менее 8 символов';
  }

  if (v.description && v.description.trim().length > 500) {
    errors.description = 'Описание слишком длинное (максимум 500 символов)';
  }

  return errors;
};

export const isValid = (errors: PersonFormErrors): boolean =>
  Object.keys(errors).length === 0;
