import type { FC, FormEvent } from 'react';
import { AuthForm } from '../../AuthForm/AuthForm';
import type { RegistrFormStepOneProps } from './type';

export const RegistrationFormStepOne: FC<RegistrFormStepOneProps> = ({
  values,
  onChange,
  onSubmit,
  isLoading,
  className,
  emailErrorText,
  passwordErrorText,
  passwordStatusText
}) => {
  // просто пробрасываем onSubmit наверх – в RegistrationPage там уже валидация и переход на шаг 2
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    onSubmit(e);
  };

  return (
    <AuthForm
      values={values}
      onChange={onChange}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      className={className}
      submitText='Далее'
      showRegisterLink={false}
      passwordPlaceholder='Придумайте надёжный пароль'
      passwordHint='Пароль должен содержать не менее 8 знаков'
      emailErrorText={emailErrorText}
      passwordErrorText={passwordErrorText}
      passwordStatusText={passwordStatusText}
      // globalErrorText здесь не передаём — это только для логина
    />
  );
};

export default RegistrationFormStepOne;
