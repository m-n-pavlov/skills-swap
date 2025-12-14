export type PersonProps = {
  email: string;
  name: string;
  handleInputChange: () => void;
  birthday: Date;
  gender: 'unknown' | 'male' | 'female';
  city: string;
  handleInputClick: () => void;
  handleSubmit: () => void;
  description: string;
  disabled: boolean;
  password: string;
};
