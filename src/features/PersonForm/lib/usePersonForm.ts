import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { SyntheticEvent } from 'react';
import { useSelector } from 'react-redux';

import type { PersonFormErrors, PersonFormValue } from '../ui/type';
import { validatePersonForm } from './validate';
import { normalizeForCompare } from './normalize';
import { personFormToUpdatePayload, userToPersonForm } from './mappers';

import { updateProfile } from '../../../app/store/slices/authSlice/authSlice';
import {
  selectAuthError,
  selectAuthLoading,
  selectCurrentUser
} from '../../../app/store/slices/authSlice/authSelector';

import { useAppDispatch } from '../../../shared/hooks';
import { fileToBase64, isImageFile } from '../../../shared/utils/fileUtils';

const EMPTY_FORM: PersonFormValue = {
  email: '',
  name: '',
  birthday: null,
  gender: 'other',
  cityId: '',
  description: '',
  password: ''
};

type Touched = Partial<Record<keyof PersonFormValue, boolean>>;

export const usePersonForm = () => {
  const dispatch = useAppDispatch();

  const currentUser = useSelector(selectCurrentUser);
  const isLoading = useSelector(selectAuthLoading);
  const serverError = useSelector(selectAuthError);

  const [formValue, setFormValue] = useState<PersonFormValue>(EMPTY_FORM);
  const [errors, setErrors] = useState<PersonFormErrors>({});
  const [touched, setTouched] = useState<Touched>({});
  const [showPasswordInput, setShowPasswordInput] = useState(false);

  const [avatarBase64, setAvatarBase64] = useState<string | null>(null);
  const [avatarToRemove, setAvatarToRemove] = useState(false);
  const [avatarError, setAvatarError] = useState<string | null>(null);
  const [isAvatarConverting, setIsAvatarConverting] = useState(false);

  const submitting = useRef(false);

  const initialComparableRef = useRef<string>(
    JSON.stringify(normalizeForCompare(EMPTY_FORM))
  );
  const initialAvatarRef = useRef<string | null>(null);

  useEffect(() => {
    if (!currentUser) {
      setFormValue(EMPTY_FORM);
      setErrors({});
      setTouched({});
      setShowPasswordInput(false);

      setAvatarBase64(null);
      setAvatarToRemove(false);
      setAvatarError(null);
      setIsAvatarConverting(false);

      initialComparableRef.current = JSON.stringify(
        normalizeForCompare(EMPTY_FORM)
      );
      initialAvatarRef.current = null;
      return;
    }

    const next = userToPersonForm(currentUser);
    setFormValue(next);
    setErrors({});
    setTouched({});
    setShowPasswordInput(false);

    const savedAvatar = localStorage.getItem(`avatar_${currentUser.id}`);
    setAvatarBase64(savedAvatar ?? null);
    setAvatarToRemove(false);
    setAvatarError(null);
    setIsAvatarConverting(false);

    initialComparableRef.current = JSON.stringify(normalizeForCompare(next));
    initialAvatarRef.current = savedAvatar ?? null;
  }, [currentUser]);

  const validateAll = useCallback(() => {
    const validatePassword = showPasswordInput || Boolean(formValue.password);
    const nextErrors = validatePersonForm(formValue, { validatePassword });
    setErrors(nextErrors);
    return nextErrors;
  }, [formValue, showPasswordInput]);

  useEffect(() => {
    validateAll();
  }, [validateAll]);

  const markTouched = (name: keyof PersonFormValue) =>
    setTouched((prev) => ({ ...prev, [name]: true }));

  const handleFieldChange = useCallback(
    (name: 'email' | 'name' | 'password', value: string) => {
      setFormValue((prev) => ({ ...prev, [name]: value }));
      markTouched(name);
    },
    []
  );

  const handleDescriptionChange = useCallback((value: string) => {
    setFormValue((prev) => ({ ...prev, description: value }));
    markTouched('description');
  }, []);

  const handleBirthdayChange = useCallback((date: Date | null) => {
    setFormValue((prev) => ({ ...prev, birthday: date }));
    markTouched('birthday');
  }, []);

  const handleGenderChange = useCallback((value: PersonFormValue['gender']) => {
    setFormValue((prev) => ({ ...prev, gender: value }));
    markTouched('gender');
  }, []);

  const handleCityChange = useCallback((value: string) => {
    setFormValue((prev) => ({ ...prev, cityId: value }));
    markTouched('cityId');
  }, []);

  const togglePasswordInput = useCallback(() => {
    setShowPasswordInput((prev) => {
      const next = !prev;
      if (!next) setFormValue((p) => ({ ...p, password: '' }));
      return next;
    });
  }, []);

  const handleAvatarChange = useCallback(async (files: FileList | null) => {
    const file = files?.[0] ?? null;
    if (!file) return;

    if (!isImageFile(file)) {
      setAvatarError('Загрузите файл изображения');
      return;
    }

    setAvatarError(null);
    setIsAvatarConverting(true);

    try {
      const base64 = await fileToBase64(file);
      setAvatarBase64(base64);
      setAvatarToRemove(false);
    } catch {
      setAvatarError('Не удалось прочитать файл');
    } finally {
      setIsAvatarConverting(false);
    }
  }, []);

  const handleRemoveAvatar = useCallback(() => {
    setAvatarToRemove(true);
    setAvatarError(null);
  }, []);

  const handleInputClick = useCallback(() => {}, []);

  const viewErrors: PersonFormErrors = useMemo(
    () => ({
      email: touched.email ? errors.email : undefined,
      name: touched.name ? errors.name : undefined,
      password: touched.password ? errors.password : undefined,
      birthday: touched.birthday ? errors.birthday : undefined,
      gender: touched.gender ? errors.gender : undefined,
      cityId: touched.cityId ? errors.cityId : undefined,
      description: touched.description ? errors.description : undefined
    }),
    [errors, touched]
  );

  const isDirty = useMemo(() => {
    const formComparable = JSON.stringify(normalizeForCompare(formValue));
    const formDirty = formComparable !== initialComparableRef.current;

    const avatarDirty =
      avatarToRemove || avatarBase64 !== initialAvatarRef.current;

    return formDirty || avatarDirty;
  }, [formValue, avatarBase64, avatarToRemove]);

  const isFormValid = useMemo(() => {
    const validatePassword = showPasswordInput || Boolean(formValue.password);
    const nextErrors = validatePersonForm(formValue, { validatePassword });
    const fieldsOk = Object.keys(nextErrors).length === 0;

    const avatarOk = !isAvatarConverting && !avatarError;

    return fieldsOk && avatarOk;
  }, [formValue, showPasswordInput, isAvatarConverting, avatarError]);

  const disabled = isLoading || !isFormValid || !isDirty;

  const handleSubmit = useCallback(
    async (e?: SyntheticEvent) => {
      e?.preventDefault();
      if (!currentUser) return;

      if (submitting.current) return;
      submitting.current = true;

      setTouched({
        email: true,
        name: true,
        password: true,
        birthday: true,
        gender: true,
        cityId: true,
        description: true
      });

      const nextErrors = validateAll();
      const hasErrors = Object.keys(nextErrors).length > 0;

      if (hasErrors || isAvatarConverting || avatarError) {
        submitting.current = false;
        return;
      }
      const payload = personFormToUpdatePayload(formValue, currentUser);
      const result = await dispatch(updateProfile(payload));

      if (updateProfile.fulfilled.match(result)) {
        if (avatarToRemove) {
          localStorage.removeItem(`avatar_${currentUser.id}`);
          setAvatarBase64(null);
          initialAvatarRef.current = null;
        } else {
          if (avatarBase64) {
            localStorage.setItem(`avatar_${currentUser.id}`, avatarBase64);
            setAvatarBase64(avatarBase64);
            initialAvatarRef.current = avatarBase64;
          } else {
            localStorage.removeItem(`avatar_${currentUser.id}`);
            setAvatarBase64(null);
            initialAvatarRef.current = null;
          }
        }

        setAvatarToRemove(false);

        initialComparableRef.current = JSON.stringify(
          normalizeForCompare(formValue)
        );

        setShowPasswordInput(false);
        setFormValue((p) => ({ ...p, password: '' }));
        setTouched({});
      }

      submitting.current = false;
    },
    [
      currentUser,
      validateAll,
      isAvatarConverting,
      avatarError,
      avatarBase64,
      avatarToRemove,
      formValue,
      dispatch
    ]
  );

  return {
    currentUser,
    isLoading,
    serverError,

    formValue,
    errors: viewErrors,

    showPasswordInput,
    togglePasswordInput,

    handleFieldChange,
    handleDescriptionChange,
    handleBirthdayChange,
    handleGenderChange,
    handleCityChange,

    avatarBase64,
    avatarError,
    avatarToRemove,
    handleAvatarChange,
    handleRemoveAvatar,

    handleInputClick,
    handleSubmit,

    disabled
  };
};
