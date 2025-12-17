export type Gender = 'male' | 'female' | 'other';

export type PersonFormValue = {
  email: string;
  name: string;
  birthday: Date | null;
  gender: Gender;
  cityId: string;
  description: string;
  password: string;
};

export type PersonFormErrors = Partial<Record<keyof PersonFormValue, string>>;

export type Option = { label: string; value: string };

export type PersonFormProps = {
  formValue: PersonFormValue;
  errors: PersonFormErrors;

  cityOptions: Option[];

  showPasswordInput: boolean;
  onTogglePassword: () => void;

  onFieldChange: (name: 'email' | 'name' | 'password', value: string) => void;
  onDescriptionChange: (value: string) => void;

  onBirthdayChange: (date: Date | null) => void;
  onGenderChange: (value: Gender) => void;
  onCityChange: (value: string) => void;

  // ✅ avatar
  avatarBase64: string | null;
  avatarToRemove: boolean;
  avatarError: string | null;
  onAvatarChange: (files: FileList | null) => void;
  onRemoveAvatar: () => void;

  onInputClick: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;

  disabled: boolean;
  serverError?: string | null;
};
