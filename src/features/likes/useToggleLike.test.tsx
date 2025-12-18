import { renderHook } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { useToggleLike } from './useToggleLike';
import type { TAuthUser } from '../../entities/authUser';
import authReducer, {
  type AuthState
} from '../../app/store/slices/authSlice/authSlice';

const mockUserWithLikes: TAuthUser = {
  id: '1',
  email: 'test@test.com',
  password: '12345678',
  name: 'Test User',
  avatarUrl: '/avatar.png',
  birthday: '1990-01-01',
  gender: 'other',
  cityId: '1',
  description: '',
  learningCategoryId: 'business',
  learningSubCategoryId: 'team_management',
  skillsTeach: {
    id: '1',
    name: 'Система KPI',
    shortDescription:
      'Методы разработки ключевых показателей эффективности для команды',
    description: 'Подробное руководство по созданию и внедрению системы KPI...',
    categoryId: 'business',
    subcategoryId: 'team_management',
    images: []
  },
  likes: ['card-123'],
  exchangeOffers: [],
  created_at: '2025-12-07'
};

const mockUserWithoutLikes: TAuthUser = {
  ...mockUserWithLikes,
  likes: []
};

// Создаём стор с редьюсером и полным состоянием
const createTestStore = (authState: Partial<AuthState>) => {
  const fullState: AuthState = {
    currentUser: mockUserWithLikes,
    exitsEmail: false,
    isLoading: false,
    error: null,
    ...authState
  };

  return configureStore({
    reducer: { auth: authReducer },
    preloadedState: { auth: fullState }
  });
};

const wrapper =
  (store: ReturnType<typeof createTestStore>) =>
  ({ children }: { children: React.ReactNode }) => (
    <Provider store={store}>{children}</Provider>
  );

describe('useToggleLike', () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('isLiked должна возвращать false, если пользователь не авторизован', () => {
    const store = createTestStore({
      currentUser: null,
      isLoading: false,
      error: null
    });

    const { result } = renderHook(() => useToggleLike(), {
      wrapper: wrapper(store)
    });

    expect(result.current.isLiked('any-id')).toBe(false);
  });

  it('должен возвращаться корректный статус isLiked, когда у пользователя есть массив лайков.', () => {
    const store = createTestStore({
      currentUser: mockUserWithLikes,
      isLoading: false,
      error: null
    });

    const { result } = renderHook(() => useToggleLike(), {
      wrapper: wrapper(store)
    });

    expect(result.current.isLiked('card-123')).toBe(true);
    expect(result.current.isLiked('card-789')).toBe(false);
    expect(result.current.isLiked('')).toBe(false);
  });

  it('should return false for isLiked when user.likes is undefined', () => {
    const store = createTestStore({
      currentUser: mockUserWithoutLikes,
      isLoading: false,
      error: null
    });

    const { result } = renderHook(() => useToggleLike(), {
      wrapper: wrapper(store)
    });

    expect(result.current.isLiked('card-123')).toBe(false);
  });

  it('не должен диспатчить toggleLike если пользователь не авторизован.', async () => {
    const store = createTestStore({
      currentUser: null,
      isLoading: false,
      error: null
    });

    const { result } = renderHook(() => useToggleLike(), {
      wrapper: wrapper(store)
    });

    const dispatchSpy = jest.spyOn(store, 'dispatch');

    await result.current.toggleLikeHandler('card-123');

    expect(dispatchSpy).not.toHaveBeenCalled();
    expect(console.warn).toHaveBeenCalledWith(
      'Попытка поставить лайк без авторизации'
    );
  });

  it('должен диспатчить toggleLike если пользователь авторизован.', async () => {
    const authState = {
      user: mockUserWithLikes,
      currentUser: mockUserWithLikes,
      exitsEmail: false,
      isLoading: false,
      error: null
    };

    const store = createTestStore(authState);

    // 👇 Создаём spy до рендера
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    const { result } = renderHook(() => useToggleLike(), {
      wrapper: wrapper(store)
    });

    await result.current.toggleLikeHandler('card-999');

    // Проверяем, что dispatch был вызван хотя бы раз
    expect(dispatchSpy).toHaveBeenCalled();
  });
});
