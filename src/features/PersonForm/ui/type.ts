export type PersonFormProps = {
  formValue: {
    email: string;
    name: string;
    birthday: Date;
    gender: 'unknown' | 'male' | 'female';
    city: string;
    description: string;
    password: string;
  };
  handleInputChange: () => void;
  handleInputClick: () => void;
  handleSubmit: () => void;
  disabled: boolean;
};
