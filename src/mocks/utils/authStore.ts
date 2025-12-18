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

export const authUsers: TAuthUser[] = [];

registeredUsers.forEach((regUser) => {
  authUsers.push(regUser);
});

initialUsers.forEach((initUser) => {
  const exists = authUsers.some((user) => user.email === initUser.email);
  if (!exists) {
    authUsers.push(initUser);
  } else {
    const existingIndex = authUsers.findIndex(
      (u) => u.email === initUser.email
    );
    if (existingIndex !== -1) {
      authUsers[existingIndex] = {
        ...authUsers[existingIndex],
        ...initUser,
        likes: authUsers[existingIndex].likes,
        exchangeOffers: authUsers[existingIndex].exchangeOffers
      };
    }
  }
});

const mergeUserData = (
  existingUser: TAuthUser,
  newData: Partial<TAuthUser>
): TAuthUser => {
  return {
    ...existingUser,
    ...newData,
    likes: newData.likes !== undefined ? newData.likes : existingUser.likes,
    exchangeOffers:
      newData.exchangeOffers !== undefined
        ? newData.exchangeOffers
        : existingUser.exchangeOffers
  };
};

export const addUserToStore = (user: TAuthUser) => {
  const existingIndex = authUsers.findIndex(
    (u) => u.id === user.id || u.email === user.email
  );

  if (existingIndex !== -1) {
    authUsers[existingIndex] = mergeUserData(authUsers[existingIndex], user);
  } else {
    authUsers.push(user);
  }

  saveUserToLocalStorage(authUsers[existingIndex] || user);
};

export const saveUserToLocalStorage = (updatedUser: TAuthUser) => {
  try {
    let registeredUsers: TAuthUser[] = [];
    const registeredUsersStr = localStorage.getItem('registered_users');

    if (registeredUsersStr) {
      registeredUsers = JSON.parse(registeredUsersStr);
    }

    const existingIndex = registeredUsers.findIndex(
      (u) => u.id === updatedUser.id
    );

    if (existingIndex !== -1) {
      registeredUsers[existingIndex] = mergeUserData(
        registeredUsers[existingIndex],
        updatedUser
      );
    } else {
      registeredUsers.push(updatedUser);
    }

    localStorage.setItem('registered_users', JSON.stringify(registeredUsers));

    const currentUserStr = localStorage.getItem('current_user');
    if (currentUserStr) {
      const currentUser = JSON.parse(currentUserStr);
      if (currentUser.id === updatedUser.id) {
        localStorage.setItem(
          'current_user',
          JSON.stringify({
            ...currentUser,
            likes: updatedUser.likes,
            exchangeOffers: updatedUser.exchangeOffers
          })
        );
      }
    }
  } catch (error) {}
};
