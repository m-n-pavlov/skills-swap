import type { FormEvent } from 'react';

import { RegistrationLayout } from '../../features/auth/ui/Registration/RegistrationLayout';
import { RegistrationFormStepOne } from '../../features/auth/ui/Registration/RegistrationFormStepOne';
import { RegistrationFormStepTwo } from '../../features/auth/ui/Registration/RegistrationFormStepTwo';
import { RegistrationFormStepThree } from '../../features/auth/ui/Registration/RegistrationFormStepThree';
import { useAppDispatch, useAppSelector } from '../../shared/hooks';
import {
  goToStep,
  prevStep
} from '../../app/store/slices/registration/registrationSlice';
import { selectRegistration } from '../../app/store/slices/registration/registrationSelectors';
import { useStep1Form } from '../../features/auth/lib/useStep1Form';
import { useStep2Form } from '../../features/auth/lib/useStep2Form';
import { useStep3Form } from '../../features/auth/lib/useStep3Form';

export const RegistrationPage = () => {
  const dispatch = useAppDispatch();
  const { currentStep } = useAppSelector(selectRegistration);

  // ---------------- STEP 1 ----------------
  const step1 = useStep1Form();

  const step1Values = { email: step1.email, password: step1.password };

  const handleStep1Change = (field: 'email' | 'password', value: string) => {
    if (field === 'email') step1.handleEmailChange(value);
    if (field === 'password') step1.handlePasswordChange(value);
  };

  const handleStep1Submit = (e: FormEvent<HTMLFormElement>) => {
    void step1.handleSubmit(e);
  };

  // ---------------- STEP 2 ----------------
  const step2 = useStep2Form();
  const step2Values = {
    name: step2.name,
    birthday: step2.date ? new Date(step2.date) : null,
    gender: step2.gender,
    city: step2.city,
    learningCategory: step2.categories,
    learningSubcategory: step2.subCategories,
    avatarUrl: step2.avatarPreview
  };

  const handleStep2Change = (
    field:
      | 'name'
      | 'birthday'
      | 'gender'
      | 'city'
      | 'learningCategory'
      | 'learningSubcategory'
      | 'avatarUrl',
    value: string | Date | null
  ) => {
    if (field === 'name') step2.handleNameChange(String(value ?? ''));
    if (field === 'birthday') step2.handleDateChange(String(value ?? ''));
    if (field === 'gender') step2.handleGenderChange(String(value ?? ''));
    if (field === 'city') step2.handleCityChange(String(value ?? ''));
    if (field === 'learningCategory')
      step2.handleCategoryChange(String(value ?? ''));
    if (field === 'learningSubcategory')
      step2.handleSubCategoryChange(String(value ?? ''));
    if (field === 'birthday') {
      const d = value as Date | null;
      step2.handleDateChange(d ? d.toISOString().slice(0, 10) : '');
    }
  };

  const handleStep2Back = () => {
    dispatch(prevStep());
  };

  const handleStep2Next = () => {
    step2.handleSubmit();
  };

  // ---------------- STEP 3 ----------------
  const step3 = useStep3Form();

  const step3Values = {
    skillName: step3.skillName,
    skillCategory: step3.skillCategory,
    skillSubcategory: step3.skillSubCategory,
    description: step3.description
  };

  const handleStep3Change = (
    field: 'skillName' | 'skillCategory' | 'skillSubcategory' | 'description',
    value: string
  ) => {
    if (field === 'skillName') step3.handleSkillNameChange(value);
    if (field === 'skillCategory') step3.handleSkillCategoryChange(value);
    if (field === 'skillSubcategory') step3.handleSkillSubCategoryChange(value);
    if (field === 'description') step3.handleDescriptionChange(value);
  };

  const handleStep3Submit = (e: FormEvent<HTMLFormElement>) => {
    void step3.handleSubmit(e);
  };

  const handleStep3Back = () => {
    dispatch(goToStep(2));
  };

  // ----- options -----
  const genderOptions = [
    { label: 'Женский', value: 'female' },
    { label: 'Мужской', value: 'male' },
    { label: 'Не указан', value: 'other' }
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

  return (
    <RegistrationLayout currentStep={currentStep}>
      {currentStep === 1 && (
        <RegistrationFormStepOne
          values={step1Values}
          onChange={handleStep1Change}
          onSubmit={handleStep1Submit}
          isLoading={step1.isCheckingEmail}
          emailErrorText={step1.emailError ?? undefined}
          passwordErrorText={step1.passwordError ?? undefined}
          isSubmitDisabled={!step1.isFormValid}
        />
      )}

      {currentStep === 2 && (
        <RegistrationFormStepTwo
          values={step2Values}
          onChange={handleStep2Change}
          onAvatarChange={(file) => {
            void step2.handleAvatarChange(file);
          }}
          onBack={handleStep2Back}
          onNext={handleStep2Next}
          genderOptions={genderOptions}
          cityOptions={cityOptions}
          learningCategoryOptions={learningCategoryOptions}
          learningSubcategoryOptions={learningSubcategoryOptions}
        />
      )}

      {currentStep === 3 && (
        <RegistrationFormStepThree
          values={step3Values as any}
          onChange={handleStep3Change as any}
          onSubmit={handleStep3Submit}
          onBack={handleStep3Back}
          isLoading={step3.isImagesConverting}
          categoryOptions={skillCategoryOptions}
          subcategoryOptions={skillSubcategoryOptions}
          skillNameErrorText={step3.skillNameError ?? undefined}
          categoryErrorText={step3.skillCategoryError ?? undefined}
          subcategoryErrorText={step3.skillSubCategoryError ?? undefined}
          descriptionErrorText={step3.descriptionError ?? undefined}
          onFilesChange={(files) => {
            void step3.handleImagesChange(files as unknown as FileList);
          }}
        />
      )}
    </RegistrationLayout>
  );
};

export default RegistrationPage;
