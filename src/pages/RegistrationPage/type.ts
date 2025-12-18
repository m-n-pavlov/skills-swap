export type StepOneValues = {
  email: string;
  password: string;
};

export type StepTwoValues = {
  name: string;
  birthday: Date | null;
  gender: string;
  city: string;
  learningCategory: string;
  learningSubcategory: string;
  avatarUrl: string | null;
};

export type StepThreeValues = {
  skillName: string;
  skillCategory: string;
  skillSubcategory: string;
  description: string;
};
