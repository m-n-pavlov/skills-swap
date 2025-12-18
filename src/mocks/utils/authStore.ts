import rawData from '../../../public/db/auth.json';
import type { TAuthUser } from '../../entities/authUser';

const normalizeGender = (gender: string): TAuthUser['gender'] => {
  if (gender === 'male' || gender === 'female' || gender === 'other') {
    return gender;
  }
  return 'other';
};

const loadRegisteredUsersFromLocalStorage = (): TAuthUser[] => {
  try {
    const registeredUsersStr = localStorage.getItem('registered_users');
    if (!registeredUsersStr) return [];

    const users = JSON.parse(registeredUsersStr);
    if (!Array.isArray(users)) return [];

    return users.map((u: any) => ({
      id: u.id,
      email: u.email,
      password: u.password || '',
      name: u.name,
      avatarUrl: u.avatarUrl || '',
      birthday: u.birthday || '',
      gender: normalizeGender(u.gender),
      cityId: u.cityId || '',
      description: u.description || '',
      learningCategoryId: u.learningCategoryId || '',
      learningSubCategoryId: u.learningSubCategoryId || '',
      skillsTeach: u.skillsTeach || null,
      likes: Array.isArray(u.likes) ? u.likes : [],
      exchangeOffers: Array.isArray(u.exchangeOffers) ? u.exchangeOffers : [],
      created_at: u.created_at || new Date().toISOString()
    }));
  } catch (error) {
    console.error(' Ошибка загрузки пользователей из localStorage:', error);
    return [];
  }
};

const initialUsers = rawData.users.map((u: any) => ({
  id: u.id,
  email: u.email,
  password: u.password,
  name: u.name,
  avatarUrl: u.avatarUrl,
  birthday: u.birthday,
  gender: normalizeGender(u.gender),
  cityId: u.cityId,
  description: u.description || '',
  learningCategoryId: u.learningCategoryId || '',
  learningSubCategoryId: u.learningSubCategoryId || '',
  skillsTeach: u.skillsTeach || null,
  likes: Array.isArray(u.likes) ? u.likes : [],
  exchangeOffers: Array.isArray(u.exchangeOffers) ? u.exchangeOffers : [],
  created_at: u.created_at || new Date().toISOString()
})) as TAuthUser[];

const registeredUsers = loadRegisteredUsersFromLocalStorage();

export const authUsers: TAuthUser[] = [
  ...initialUsers,
  ...registeredUsers.filter(
    (regUser) =>
      !initialUsers.some((initUser) => initUser.email === regUser.email)
  )
];

export const addUserToStore = (user: TAuthUser) => {
  const existingIndex = authUsers.findIndex(
    (u) => u.id === user.id || u.email === user.email
  );

  if (existingIndex !== -1) {
    authUsers[existingIndex] = user;
  } else {
    authUsers.push(user);
  }

  saveUserToLocalStorage(user);
};

export const saveUserToLocalStorage = (user: TAuthUser) => {
  try {
    let registeredUsers: TAuthUser[] = [];
    const registeredUsersStr = localStorage.getItem('registered_users');

    if (registeredUsersStr) {
      registeredUsers = JSON.parse(registeredUsersStr);
    }

    const existingIndex = registeredUsers.findIndex((u) => u.id === user.id);

    if (existingIndex !== -1) {
      registeredUsers[existingIndex] = user;
    } else {
      registeredUsers.push(user);
    }

    localStorage.setItem('registered_users', JSON.stringify(registeredUsers));
  } catch (error) {
    console.error('Ошибка сохранения в localStorage:', error);
  }
};
