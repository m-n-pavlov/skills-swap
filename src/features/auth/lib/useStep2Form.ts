import { useState, useCallback, useRef, useEffect } from 'react';
import type { SyntheticEvent } from 'react';

import {
  validateName,
  validateDate,
  validateGender,
  validateCity,
  validateCategory,
  validateSubCategory,
  validateAvatar
} from '../lib/validateStep2';

import { useAppDispatch, useAppSelector } from '../../../shared/hooks';
import { saveStep2 } from '../../../app/store/slices/registration/registrationSlice';
import { selectRegistration } from '../../../app/store/slices/registration/registrationSelectors';
import { fileToBase64, isImageFile } from '../../../shared/utils/fileUtils';

type GenderOption = 'male' | 'female' | 'other' | '';

export const useStep2Form = () => {
  const dispatch = useAppDispatch();
  const { step2, currentStep } = useAppSelector(selectRegistration);

  const [name, setName] = useState(step2?.name ?? '');
  const [date, setDate] = useState(step2?.date ?? '');
  const [gender, setGender] = useState<GenderOption>(step2?.gender ?? '');
  const [city, setCity] = useState(step2?.city ?? '');
  const [categories, setCategories] = useState(step2?.categories ?? '');
  const [subCategories, setSubCategories] = useState(
    step2?.subCategories ?? ''
  );
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    step2?.avatarBase64 ?? null
  );
  const [isAvatarConverting, setIsAvatarConverting] = useState(false);

  const [nameError, setNameError] = useState<string | null>(null);
  const [dateError, setDateError] = useState<string | null>(null);
  const [genderError, setGenderError] = useState<string | null>(null);
  const [cityError, setCityError] = useState<string | null>(null);
  const [categoryError, setCategoryError] = useState<string | null>(null);
  const [subCategoryError, setSubCategoryError] = useState<string | null>(null);
  const [avatarError, setAvatarError] = useState<string | null>(null);

  const submitting = useRef(false);

  useEffect(() => {
    if (currentStep !== 2) return;

    setName(step2?.name ?? '');
    setDate(step2?.date ?? '');
    setGender(step2?.gender ?? '');
    setCity(step2?.city ?? '');
    setCategories(step2?.categories ?? '');
    setSubCategories(step2?.subCategories ?? '');
    setAvatarPreview(step2?.avatarBase64 ?? null);
    setAvatarFile(null);
  }, [currentStep, step2]);

  const handleNameChange = useCallback((value: string) => {
    setName(value);
    setNameError(validateName(value));
  }, []);

  const handleDateChange = useCallback((value: string) => {
    setDate(value);
    setDateError(validateDate(value));
  }, []);

  const handleGenderChange = useCallback((value: string) => {
    setGender(value as GenderOption);
    setGenderError(validateGender(value));
  }, []);

  const handleCityChange = useCallback((value: string) => {
    setCity(value);
    setCityError(validateCity(value));
  }, []);

  const handleCategoryChange = useCallback((value: string) => {
    setCategories(value);
    setCategoryError(validateCategory(value));

    setSubCategories('');
    setSubCategoryError(null);
  }, []);

  const handleSubCategoryChange = useCallback((value: string) => {
    setSubCategories(value);
    setSubCategoryError(validateSubCategory(value));
  }, []);

  const handleAvatarChange = useCallback(async (file: File | null) => {
    if (!file) {
      setAvatarFile(null);
      setAvatarPreview(null);
      setAvatarError(validateAvatar(null));
      return;
    }

    if (!isImageFile(file)) {
      setAvatarFile(null);
      setAvatarPreview(null);
      setAvatarError('Загрузите файл изображения');
      return;
    }

    setAvatarFile(file);
    setAvatarError(null);

    setIsAvatarConverting(true);
    try {
      const base64 = await fileToBase64(file);
      setAvatarPreview(base64);
    } catch {
      setAvatarPreview(null);
    } finally {
      setIsAvatarConverting(false);
    }
  }, []);

  const validateForm = (): boolean => {
    const nameErr = validateName(name);
    const dateErr = validateDate(date);
    const genderErr = validateGender(gender);
    const cityErr = validateCity(city);
    const categoryErr = validateCategory(categories);
    const subCatErr = validateSubCategory(subCategories);
    const avatarErr = validateAvatar(avatarFile);

    setNameError(nameErr);
    setDateError(dateErr);
    setGenderError(genderErr);
    setCityError(cityErr);
    setCategoryError(categoryErr);
    setSubCategoryError(subCatErr);
    setAvatarError(avatarErr);

    return !(
      nameErr ||
      dateErr ||
      genderErr ||
      cityErr ||
      categoryErr ||
      subCatErr ||
      avatarErr
    );
  };

  const handleSubmit = useCallback(
    (e?: SyntheticEvent) => {
      e?.preventDefault();
      if (submitting.current) return;
      submitting.current = true;

      const isValid = validateForm();
      if (!isValid) {
        submitting.current = false;
        return;
      }

      dispatch(
        saveStep2({
          name,
          date,
          gender: gender as 'male' | 'female' | 'other',
          city,
          categories,
          subCategories,
          avatarBase64: avatarPreview
        })
      );

      submitting.current = false;
    },
    [
      name,
      date,
      gender,
      city,
      categories,
      subCategories,
      avatarPreview,
      dispatch
    ]
  );

  const isFormValid = Boolean(
    name &&
    date &&
    gender &&
    city &&
    categories &&
    subCategories &&
    avatarPreview &&
    !nameError &&
    !dateError &&
    !genderError &&
    !cityError &&
    !categoryError &&
    !subCategoryError &&
    !avatarError &&
    !isAvatarConverting
  );

  return {
    name,
    date,
    gender,
    city,
    categories,
    subCategories,

    avatar: avatarFile,
    avatarPreview,
    isAvatarConverting,

    nameError,
    dateError,
    genderError,
    cityError,
    categoryError,
    subCategoryError,
    avatarError,

    isFormValid,

    handleNameChange,
    handleDateChange,
    handleGenderChange,
    handleCityChange,
    handleCategoryChange,
    handleSubCategoryChange,
    handleAvatarChange,
    handleSubmit
  };
};
