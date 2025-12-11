import { useState, type FormEvent } from 'react';

import { RegistrationLayout } from '../../features/auth/ui/Registration/RegistrationLayout';
import { RegistrationFormStepOne } from '../../features/auth/ui/Registration/RegistrationFormStepOne';
import { RegistrationFormStepTwo } from '../../features/auth/ui/Registration/RegistrationFormStepTwo';
import { RegistrationFormStepThree } from '../../features/auth/ui/Registration/RegistrationFormStepThree';

import type { StepIllustrationCode } from '../../shared/ui/StepIllustration/type';
import type { StepOneValues, StepTwoValues, StepThreeValues } from './type';

// ---------- Компонент страницы регистрации ----------

export const RegistrationPage = () => {
  const [step, setStep] = useState<StepIllustrationCode>(1);

  // ----- Шаг 1: email + пароль -----
  const [step1Values, setStep1Values] = useState<StepOneValues>({
    email: '',
    password: ''
  });

  const handleStep1Change = (field: keyof StepOneValues, value: string) => {
    setStep1Values((prev) => ({ ...prev, [field]: value }));
  };

  const handleStep1Submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // позже добавишь валидацию — сейчас просто идём на шаг 2
    setStep(2);
  };

  // ----- Шаг 2: личные данные -----
  const [step2Values, setStep2Values] = useState<StepTwoValues>({
    name: '',
    birthday: null,
    gender: '',
    city: '',
    learningCategory: '',
    learningSubcategory: '',
    avatarUrl: null
  });

  const handleStep2Change = (
    field: keyof StepTwoValues,
    value: string | Date | null
  ) => {
    setStep2Values((prev) => ({ ...prev, [field]: value as never }));
  };

  const handleStep2Back = () => {
    setStep(1);
  };

  const handleStep2Next = () => {
    // позже добавишь валидацию — сейчас просто идём на шаг 3
    setStep(3);
  };

  // ----- Шаг 3: навык -----
  const [step3Values, setStep3Values] = useState<StepThreeValues>({
    skillName: '',
    skillCategory: '',
    skillSubcategory: '',
    description: ''
  });

  const handleStep3Change = (field: keyof StepThreeValues, value: string) => {
    setStep3Values((prev) => ({ ...prev, [field]: value }));
  };

  const handleStep3Submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // финальный сабмит (сюда потом прикрутишь запрос на бекенд)
    console.log('FINAL REG DATA:', {
      step1Values,
      step2Values,
      step3Values
    });
    window.alert(
      'Здесь по ТЗ должно открываться модальное окно.\n' +
        'Сейчас пока заглушка — модальное окно ещё в разработке.'
    );
  };

  const handleStep3Back = () => {
    setStep(2);
  };

  // ----- Моковые options для DropdownInput -----
  const genderOptions = [
    { label: 'Женский', value: 'female' },
    { label: 'Мужской', value: 'male' }
  ];

  const cityOptions = [
    { label: 'Алматы', value: 'almaty' },
    { label: 'Астана', value: 'astana' },
    { label: 'Шымкент', value: 'shymkent' }
  ];

  const learningCategoryOptions = [
    { label: 'Языки', value: 'languages' },
    { label: 'IT и программирование', value: 'it' },
    { label: 'Музыка', value: 'music' }
  ];

  const learningSubcategoryOptions = [
    { label: 'Английский язык', value: 'english' },
    { label: 'Frontend разработка', value: 'frontend' },
    { label: 'Гитара', value: 'guitar' }
  ];

  const skillCategoryOptions = [
    { label: 'Frontend', value: 'frontend' },
    { label: 'Backend', value: 'backend' },
    { label: 'Дизайн', value: 'design' }
  ];

  const skillSubcategoryOptions = [
    { label: 'React', value: 'react' },
    { label: 'Node.js', value: 'node' },
    { label: 'Figma', value: 'figma' }
  ];

  // ---------- Рендер ----------

  return (
    <RegistrationLayout currentStep={step}>
      {step === 1 && (
        <RegistrationFormStepOne
          values={step1Values}
          onChange={handleStep1Change}
          onSubmit={handleStep1Submit}
          isLoading={false}
        />
      )}

      {step === 2 && (
        <RegistrationFormStepTwo
          values={step2Values}
          onChange={handleStep2Change}
          onBack={handleStep2Back}
          onNext={handleStep2Next}
          genderOptions={genderOptions}
          cityOptions={cityOptions}
          learningCategoryOptions={learningCategoryOptions}
          learningSubcategoryOptions={learningSubcategoryOptions}
        />
      )}

      {step === 3 && (
        <RegistrationFormStepThree
          values={step3Values}
          onChange={handleStep3Change}
          onSubmit={handleStep3Submit}
          onBack={handleStep3Back}
          isLoading={false}
          categoryOptions={skillCategoryOptions}
          subcategoryOptions={skillSubcategoryOptions}
        />
      )}
    </RegistrationLayout>
  );
};

export default RegistrationPage;
