import { useState, useCallback, useRef, useEffect } from 'react';
import type { SyntheticEvent } from 'react';

import {
  validateSkillName,
  validateSkillCategory,
  validateSkillSubCategory,
  validateSkillDescription,
  validateSkillImages
} from './validateStep3';

import { useAppDispatch, useAppSelector } from '../../../shared/hooks';
import { saveStep3 } from '../../../app/store/slices/registration/registrationSlice';
import { selectRegistration } from '../../../app/store/slices/registration/registrationSelectors';
import { fileToBase64, isImageFile } from '../../../shared/utils/fileUtils';

export const useStep3Form = () => {
  const dispatch = useAppDispatch();
  const { step3, currentStep } = useAppSelector(selectRegistration);

  const [skillName, setSkillName] = useState(step3?.skillName ?? '');
  const [skillCategory, setSkillCategory] = useState(
    step3?.skillCategory ?? ''
  );
  const [skillSubCategory, setSkillSubCategory] = useState(
    step3?.skillSubCategory ?? ''
  );
  const [description, setDescription] = useState(step3?.description ?? '');
  const [images, setImages] = useState<File[]>([]);
  const [imagesPreview, setImagesPreview] = useState<string[]>(
    step3?.imagesBase64 ?? []
  );
  const [isImagesConverting, setImagesConverting] = useState(false);

  const [skillNameError, setSkillNameError] = useState<string | null>(null);
  const [skillCategoryError, setSkillCategoryError] = useState<string | null>(
    null
  );
  const [skillSubCategoryError, setSkillSubCategoryError] = useState<
    string | null
  >(null);
  const [descriptionError, setDescriptionError] = useState<string | null>(null);
  const [imagesError, setImagesError] = useState<string | null>(null);

  const submitting = useRef(false);

  useEffect(() => {
    if (currentStep !== 3) return;

    setSkillName(step3?.skillName ?? '');
    setSkillCategory(step3?.skillCategory ?? '');
    setSkillSubCategory(step3?.skillSubCategory ?? '');
    setDescription(step3?.description ?? '');
    setImagesPreview(step3?.imagesBase64 ?? []);
    setImages([]);
  }, [currentStep, step3]);

  const handleSkillNameChange = useCallback((value: string) => {
    setSkillName(value);
    setSkillNameError(validateSkillName(value));
  }, []);

  const handleSkillCategoryChange = useCallback((value: string) => {
    setSkillCategory(value);
    setSkillCategoryError(validateSkillCategory(value));

    setSkillSubCategory('');
    setSkillSubCategoryError(null);
  }, []);

  const handleSkillSubCategoryChange = useCallback((value: string) => {
    setSkillSubCategory(value);
    setSkillSubCategoryError(validateSkillSubCategory(value));
  }, []);

  const handleDescriptionChange = useCallback((value: string) => {
    setDescription(value);
    setDescriptionError(validateSkillDescription(value));
  }, []);

  const handleImagesChange = useCallback(async (files: File[] | FileList) => {
    const fileArray = Array.isArray(files) ? files : Array.from(files);

    if (fileArray.length === 0) {
      setImages([]);
      setImagesPreview([]);
      setImagesError(validateSkillImages([]));
      return;
    }

    const imageFiles = fileArray.filter((file) => isImageFile(file));

    if (imageFiles.length === 0) {
      setImages([]);
      setImagesPreview([]);
      setImagesError('Загрузите файл изображения');
      return;
    }

    setImages(imageFiles);
    setImagesError(null);

    setImagesConverting(true);
    try {
      const previews = await Promise.all(
        imageFiles.map((file) => fileToBase64(file))
      );
      setImagesPreview(previews);
    } catch {
      setImagesPreview([]);
    } finally {
      setImagesConverting(false);
    }
  }, []);

  const validateForm = (): boolean => {
    const skillNameErr = validateSkillName(skillName);
    const skillCategoryErr = validateSkillCategory(skillCategory);
    const skillSubCategoryErr = validateSkillSubCategory(skillSubCategory);
    const descriptionErr = validateSkillDescription(description);
    const imagesErr = validateSkillImages(imagesPreview);

    setSkillNameError(skillNameErr);
    setSkillCategoryError(skillCategoryErr);
    setSkillSubCategoryError(skillSubCategoryErr);
    setDescriptionError(descriptionErr);
    setImagesError(imagesErr);

    return !(
      skillNameErr ||
      skillCategoryErr ||
      skillSubCategoryErr ||
      descriptionErr ||
      imagesErr
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
        saveStep3({
          skillName,
          skillCategory,
          skillSubCategory,
          description,
          imagesBase64: imagesPreview
        })
      );

      submitting.current = false;
    },
    [
      skillName,
      skillCategory,
      skillSubCategory,
      description,
      imagesPreview,
      dispatch
    ]
  );

  const isFormValid = Boolean(
    skillName &&
    skillCategory &&
    skillSubCategory &&
    description &&
    imagesPreview.length > 0 &&
    !skillNameError &&
    !skillCategoryError &&
    !skillSubCategoryError &&
    !descriptionError &&
    !imagesError &&
    !isImagesConverting
  );

  return {
    skillName,
    skillCategory,
    skillSubCategory,
    description,

    images,
    imagesPreview,
    isImagesConverting,

    skillNameError,
    skillCategoryError,
    skillSubCategoryError,
    descriptionError,
    imagesError,

    isFormValid,

    handleSkillNameChange,
    handleSkillCategoryChange,
    handleSkillSubCategoryChange,
    handleDescriptionChange,
    handleImagesChange,
    handleSubmit
  };
};
