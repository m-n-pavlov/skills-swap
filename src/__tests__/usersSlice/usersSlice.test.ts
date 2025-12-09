import type { TUser } from '../../entities/users.ts';

jest.mock('../../api', () => ({
  getUsersApi: jest.fn()
}));
import * as api from '../../api';

import type { RootState } from '../../app/store';
import {
  selectAllUsers,
  selectUserById
} from '../../app/store/slices/usersSlice/userSelector.ts';
import { configureStore } from '@reduxjs/toolkit';
import usersReducer, {
  fetchGetUsers
} from '../../app/store/slices/usersSlice/userSlice.ts';
describe('Проверяют редьюсер слайса для пользователей', () => {
  const mockUsers: TUser[] = [
    {
      id: '1',
      name: 'Иван',
      avatarUrl: '/image/ivan.png',
      cityId: 'saint_petersburg',
      gender: 'male',
      birthday: '1996-12-01',
      skillsTeach: ['1'],
      skillsLearn: ['2', '3'],
      likes: 0,
      createdAt: '2025-12-07'
    },
    {
      id: '2',
      name: 'Виктория',
      avatarUrl: '/image/viktoria_1.png',
      cityId: 'kemerovo',
      gender: 'female',
      birthday: '1994-08-14',
      skillsTeach: ['2', '6'],
      skillsLearn: ['3'],
      likes: 0,
      createdAt: '2025-05-22'
    },
    {
      id: '3',
      name: 'Виктория',
      avatarUrl: '/image/viktoria_2.png',
      cityId: 'sochi',
      gender: 'female',
      birthday: '1994-03-30',
      skillsTeach: ['11', '4', '1'],
      skillsLearn: ['5'],
      likes: 0,
      createdAt: '2025-07-11'
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Тест загрузки пользователей. Состояние pending', async () => {
    (api.getUsersApi as jest.Mock).mockResolvedValue(mockUsers);
    const store = configureStore({
      reducer: { users: usersReducer }
    });
    store.dispatch({ type: fetchGetUsers.pending.type });
    const { users, currentUser, isLoading, error } = store.getState().users;
    expect(users).toEqual([]);
    expect(currentUser).toEqual(null);
    expect(isLoading).toEqual(true);
    expect(error).toEqual(null);
  });

  test('Тест загрузки пользователей. Состояние fulfilled', async () => {
    (api.getUsersApi as jest.Mock).mockResolvedValue(mockUsers);
    const store = configureStore({
      reducer: { users: usersReducer }
    });
    await store.dispatch(fetchGetUsers());
    const { users, currentUser, isLoading, error } = store.getState().users;
    expect(users).toEqual(mockUsers);
    expect(currentUser).toEqual(null);
    expect(isLoading).toEqual(false);
    expect(error).toEqual(null);
  });

  test('Тест загрузки пользователей. Состояние rejected', async () => {
    const err = 'Ошибка получения списка пользователей';
    jest.spyOn(api, 'getUsersApi').mockRejectedValue(new Error(err));
    const store = configureStore({
      reducer: { users: usersReducer }
    });
    await store.dispatch(fetchGetUsers());
    const { users, currentUser, isLoading, error } = store.getState().users;
    expect(users).toEqual([]);
    expect(currentUser).toEqual(null);
    expect(isLoading).toEqual(false);
    expect(error).toEqual(err);
  });

  const mockState = {
    users: {
      users: mockUsers,
      currentUser: null,
      isLoading: false,
      error: null
    }
  } as RootState;

  test('Тест селектора получения списка пользователей', () => {
    expect(selectAllUsers(mockState)).toEqual(mockUsers);
  });

  test('Тест селектора получения городов по ID', () => {
    expect(selectUserById(mockUsers[2].id)(mockState)).toEqual(mockUsers[2]);
    expect(selectUserById('unknown')(mockState)).toBeNull();
  });
});
