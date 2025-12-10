export type TUser = {
  id: string;
  name: string;
  avatarUrl: string;
  cityId: string;
  gender: 'male' | 'female' | 'other';
  birthday: string;
  skillsTeach: string[];
  skillsLearn: string[];
  likes: number;
  createdAt: string;
};
