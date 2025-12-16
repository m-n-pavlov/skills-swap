import type { FormEvent } from 'react';
import { useMemo } from 'react';

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
import { useRegistrationConfirmation } from '../../features/auth/lib/useRegistrationConfirmation';

import { OfferPreviewModal } from '../../widgets/OfferPreviewModal';

import { selectAllCities } from '../../app/store/slices/citiesSlice/citiesSelector';
import { selectAllCategories } from '../../app/store/slices/categoriesSlice/categoriesSelector';

import type { DropdownOption } from '../../shared/ui/DropdownInput/types';
import type { TCity } from '../../entities/cities';
import type { TCategory, TSubCategories } from '../../entities/categories';

export const RegistrationPage = () => {
  const dispatch = useAppDispatch();

  const { currentStep } = useAppSelector(selectRegistration);
  const cities = useAppSelector(selectAllCities) as TCity[];
  const categories = useAppSelector(selectAllCategories) as TCategory[];

  // ---------------- STEP 1 ----------------
  const step1 = useStep1Form();

  const step1Values = { email: step1.email, password: step1.password };

  const handleStep1Change = (field: 'email' | 'password', value: string) => {
    if (field === 'email') step1.handleEmailChange(value);
    if (field === 'password') step1.handlePasswordChange(value);
  };

  const handleStep1Submit = async (event: FormEvent<HTMLFormElement>) => {
    await step1.handleSubmit(event);

    if (step1.isFormValid && step1.isEmailAvailable !== false) {
      dispatch(goToStep(2));
    }
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

  const handleStep2Back = () => dispatch(prevStep());

  const handleStep2Next = () => {
    step2.handleSubmit();

    if (step2.isFormValid) {
      dispatch(goToStep(3));
    }
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

  const handleStep3Back = () => dispatch(goToStep(2));

  // -------- confirmation modal hook --------
  const confirm = useRegistrationConfirmation();

  const handleStep3Submit = (event: FormEvent<HTMLFormElement>) => {
    step3.handleSubmit(event);

    if (step3.isFormValid) {
      confirm.openModal();
    }
  };

  const genderOptions: DropdownOption[] = [
    { label: 'Женский', value: 'female' },
    { label: 'Мужской', value: 'male' },
    { label: 'Не указан', value: 'other' }
  ];

  const cityOptions: DropdownOption[] = useMemo(
    () =>
      cities.map((city: TCity) => ({
        value: city.id,
        label: city.location
      })),
    [cities]
  );

  const categoryOptions: DropdownOption[] = useMemo(
    () =>
      categories.map((category: TCategory) => ({
        value: category.id,
        label: category.name
      })),
    [categories]
  );

  const learningSubcategoryOptions: DropdownOption[] = useMemo(() => {
    const selectedCategory = categories.find(
      (category: TCategory) => category.id === step2.categories
    );

    const subs: TSubCategories[] = selectedCategory?.subCategories ?? [];

    return subs.map((sub: TSubCategories) => ({
      value: sub.id,
      label: sub.name
    }));
  }, [categories, step2.categories]);

  const skillSubcategoryOptions: DropdownOption[] = useMemo(() => {
    const selectedCategory = categories.find(
      (category: TCategory) => category.id === step3.skillCategory
    );

    const subs: TSubCategories[] = selectedCategory?.subCategories ?? [];

    return subs.map((sub: TSubCategories) => ({
      value: sub.id,
      label: sub.name
    }));
  }, [categories, step3.skillCategory]);

  return (
    <>
      <RegistrationLayout currentStep={currentStep}>
        {currentStep === 1 && (
          <RegistrationFormStepOne
            values={step1Values}
            onChange={handleStep1Change}
            onSubmit={handleStep1Submit}
            isLoading={step1.isCheckingEmail}
            emailErrorText={step1.emailError ?? undefined}
            passwordErrorText={step1.passwordError ?? undefined}
            isFormValid={step1.isFormValid}
          />
        )}

        {currentStep === 2 && (
          <RegistrationFormStepTwo
            values={step2Values}
            onChange={handleStep2Change}
            onAvatarChange={(file) => void step2.handleAvatarChange(file)}
            onBack={handleStep2Back}
            onNext={handleStep2Next}
            genderOptions={genderOptions}
            cityOptions={cityOptions}
            learningCategoryOptions={categoryOptions}
            learningSubcategoryOptions={learningSubcategoryOptions}
            isFormValid={step2.isFormValid}
          />
        )}

        {currentStep === 3 && (
          <RegistrationFormStepThree
            values={step3Values}
            onChange={handleStep3Change}
            onSubmit={handleStep3Submit}
            onBack={handleStep3Back}
            isLoading={step3.isImagesConverting}
            categoryOptions={categoryOptions}
            subcategoryOptions={skillSubcategoryOptions}
            skillNameErrorText={step3.skillNameError ?? undefined}
            categoryErrorText={step3.skillCategoryError ?? undefined}
            subcategoryErrorText={step3.skillSubCategoryError ?? undefined}
            descriptionErrorText={step3.descriptionError ?? undefined}
            onFilesChange={(files) => void step3.handleImagesChange(files)}
            isFormValid={step3.isFormValid}
          />
        )}
      </RegistrationLayout>

      {/* ✅ МОДАЛКА ПОСЛЕ 3 ШАГА */}
      <OfferPreviewModal
        isOpen={confirm.isOpen}
        onClose={confirm.closeModal}
        onEdit={() => {
          confirm.closeModal();
          dispatch(goToStep(3));
        }}
        onConfirm={() => {
          void confirm.handleConfirm();
        }}
        isSubmitting={confirm.isSubmitting}
        data={{
          title: confirm.summary.skillName ?? 'Навык',
          category: `${confirm.summary.skillCategory ?? ''} / ${confirm.summary.skillSubCategory ?? ''}`,
          description: confirm.summary.description ?? '',
          images: step3.imagesPreview ?? []
        }}
      />
    </>
  );
};

export default RegistrationPage;
