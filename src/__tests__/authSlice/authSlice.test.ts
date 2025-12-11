import type { TUser } from '../../entities/users.ts';

jest.mock('../../api/auth/authApi', () => ({
  loginApi: jest.fn(),
  logoutApi: jest.fn()
}));
import { configureStore } from '@reduxjs/toolkit';
import authReducer, {
  fetchLogin,
  fetchLogout
} from '../../app/store/slices/authSlice/authSlice.ts';
import * as api from '../../api';
import type { RootState } from '../../app/store';
import {
  selectAuthUser,
  selectIsAuth
} from '../../app/store/slices/authSlice/authSelector.ts';

describe('Проверяют редьюсер слайса для работы по авторизации', () => {
  const mockUser: TUser = {
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
  };
  const preloadedState = {
    auth: {
      user: mockUser,
      isAuth: true,
      isLoading: false,
      error: null
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Тест авторизации пользователя. Состояние pending', async () => {
    (api.loginApi as jest.Mock).mockResolvedValue({ user: mockUser });
    const store = configureStore({ reducer: { auth: authReducer } });
    store.dispatch({ type: fetchLogin.pending.type });
    const state = store.getState().auth;
    expect(state.user).toEqual(null);
    expect(state.isAuth).toEqual(false);
    expect(state.isLoading).toEqual(true);
    expect(state.error).toEqual(null);
  });

  test('Тест авторизации пользователя (Верный логин/пароль). Состояние fulfilled', async () => {
    (api.loginApi as jest.Mock).mockResolvedValue({ user: mockUser });
    const store = configureStore({ reducer: { auth: authReducer } });
    await store.dispatch(
      fetchLogin({ email: 'ivan@mail.ru', password: '12345' })
    );
    const state = store.getState().auth;
    expect(state.user).toEqual(mockUser);
    expect(state.isAuth).toEqual(true);
    expect(state.isLoading).toEqual(false);
    expect(state.error).toEqual(null);
    expect(JSON.parse(localStorage.getItem('user') || '{}')).toEqual(mockUser);
  });

  test('Тест авторизации пользователя (Неверный логин/пароль). Состояние rejected', async () => {
    const err = 'Неверный email или пароль';
    jest.spyOn(api, 'loginApi').mockRejectedValue(new Error(err));
    const store = configureStore({ reducer: { auth: authReducer } });
    await store.dispatch(
      fetchLogin({ email: 'ivan@mail.ru', password: 'wrong' })
    );
    const state = store.getState().auth;
    expect(state.user).toEqual(null);
    expect(state.isAuth).toEqual(false);
    expect(state.isLoading).toEqual(false);
    expect(state.error).toEqual(err);
  });

  test('Тест разлогинивания пользователя. Состояние pending', async () => {
    const store = configureStore({
      reducer: { auth: authReducer },
      preloadedState
    });
    store.dispatch({ type: fetchLogout.pending.type });
    const state = store.getState().auth;
    expect(state.user).toEqual(mockUser);
    expect(state.isAuth).toEqual(true);
    expect(state.isLoading).toEqual(true);
    expect(state.error).toEqual(null);
  });

  test('Тест разлогинивания пользователя. Состояние fulfilled', async () => {
    (api.logoutApi as jest.Mock).mockResolvedValue(preloadedState);
    const store = configureStore({ reducer: { auth: authReducer } });
    await store.dispatch(fetchLogout());
    const state = store.getState().auth;
    expect(state.user).toEqual(null);
    expect(state.isAuth).toEqual(false);
    expect(state.isLoading).toEqual(false);
    expect(state.error).toEqual(null);
  });

  test('Тест разлогинивания пользователя. Состояние rejected', async () => {
    const err = 'Ошибка выхода';
    jest.spyOn(api, 'logoutApi').mockRejectedValue(new Error(err));
    const store = configureStore({
      reducer: { auth: authReducer },
      preloadedState: preloadedState
    });
    await store.dispatch(fetchLogout());
    const state = store.getState().auth;
    expect(state.user).toEqual(mockUser);
    expect(state.isAuth).toEqual(true);
    expect(state.isLoading).toEqual(false);
    expect(state.error).toEqual(err);
  });

  const mockState = {
    auth: {
      user: mockUser,
      isAuth: true,
      isLoading: false,
      error: null
    }
  } as RootState;

  test('Тест селектора получения авторизованного пользователя', () => {
    expect(selectAuthUser(mockState)).toEqual(mockUser);
  });

  test('Тест селектора получения статуса авторизации', () => {
    expect(selectIsAuth(mockState)).toEqual(true);
  });
});
