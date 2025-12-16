import type { DropdownOption } from '../../../../../shared/ui/DropdownInput/types';

export interface RegistrFormStepTwoValues {
  name: string;
  birthday: Date | null;
  gender: string;
  city: string;
  learningCategory: string;
  learningSubcategory: string;
  avatarUrl: string | null;
}

export interface RegistrFormStepTwoProps {
  values: RegistrFormStepTwoValues;
  onChange: <K extends keyof RegistrFormStepTwoValues>(
    field: K,
    value: RegistrFormStepTwoValues[K]
  ) => void;
  genderOptions: DropdownOption[];
  cityOptions: DropdownOption[];
  learningCategoryOptions: DropdownOption[];
  learningSubcategoryOptions: DropdownOption[];
  onBack: () => void;
  onNext: () => void;
  onAvatarChange?: (file: File | null) => void;
  isFormValid: boolean;
}
