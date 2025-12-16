import type { FC, FormEvent } from 'react';
import { AuthForm } from '../../AuthForm/AuthForm';
import type { RegistrFormStepOneProps } from './type';

export const RegistrationFormStepOne: FC<RegistrFormStepOneProps> = ({
  values,
  onChange,
  onSubmit,
  isLoading,
  isFormValid,
  className,
  emailErrorText,
  passwordErrorText,
  passwordStatusText
}) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    onSubmit(e);
  };

  return (
    <AuthForm
      values={values}
      onChange={onChange}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      isSubmitDisabled={!isFormValid}
      className={className}
      submitText='Далее'
      showRegisterLink={false}
      passwordPlaceholder='Придумайте надёжный пароль'
      passwordHint='Пароль должен содержать не менее 8 знаков'
      emailErrorText={emailErrorText}
      passwordErrorText={passwordErrorText}
      passwordStatusText={passwordStatusText}
    />
  );
};

export default RegistrationFormStepOne;
