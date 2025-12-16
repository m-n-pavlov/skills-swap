import type { FormEvent } from 'react';
import type { DropdownOption } from '../../../../../shared/ui/DropdownInput/types';

export type RegistrFormStepThreeValues = {
  skillName: string;
  skillCategory: string;
  skillSubcategory: string;
  description: string;
};

export type RegistrFormStepThreeProps = {
  values: RegistrFormStepThreeValues;
  onChange: (field: keyof RegistrFormStepThreeValues, value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onBack: () => void;
  isLoading: boolean;
  isFormValid: boolean;
  className?: string;
  categoryOptions: DropdownOption[];
  subcategoryOptions: DropdownOption[];
  skillNameErrorText?: string;
  categoryErrorText?: string;
  subcategoryErrorText?: string;
  descriptionErrorText?: string;
  onFilesChange?: (files: FileList) => void;
};
