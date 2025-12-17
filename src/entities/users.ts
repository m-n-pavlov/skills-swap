export type TUser = {
  id: string;
  name: string;
  avatarUrl: string;
  cityId: string;
  gender: string;
  birthday: string;
  skillsTeach: string[];
  skillsLearn: string[];
  likes: number;
  createdAt: string;
  description?: string;
};
