export type TUser = {
  id: string;
  name: string;
  avatarUrl: string; // путь до public
  cityId: string; // связь с TCity
  gender: 'male' | 'female' | 'other'; // нужно для фильтров

  birthday: string; // хранится ISO, возраст считаешь на клиенте

  skillsTeach: string[]; // id Skill
  skillsLearn: string[]; // id Skill

  likes: number; // нужно для отображения карточек и сортировки
  createdAt: string; // ISO, нужно для сортировки
};
