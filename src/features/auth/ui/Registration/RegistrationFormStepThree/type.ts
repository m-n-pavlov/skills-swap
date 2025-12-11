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
  className?: string;

  categoryOptions: DropdownOption[];
  subcategoryOptions: DropdownOption[];

  // ошибки на будущее (можешь пока не использовать)
  skillNameErrorText?: string;
  categoryErrorText?: string;
  subcategoryErrorText?: string;
  descriptionErrorText?: string;

  // для InputFile, если понадобится логика
  onFilesChange?: (files: FileList) => void;
};
