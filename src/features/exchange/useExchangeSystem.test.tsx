import { renderHook, waitFor } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { useExchangeSystem } from './useExchangeSystem';
import type { TAuthUser } from '../../entities/authUser';
import { rootReducer } from '../../app/store/rootReducer';

// Мокаем API
jest.mock('../../api/auth/authChangeApi', () => ({
  ...jest.requireActual('../../api/auth/authChangeApi'),
  toggleOffersApi: jest.fn()
}));

import { toggleOffersApi } from '../../api/auth/authChangeApi';

// Типобезопасный мок
const mockToggleOffersApi = toggleOffersApi as jest.MockedFunction<
  typeof toggleOffersApi
>;

const skillId = 'skill-789';

const mockUserWithoutOffers: TAuthUser = {
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
    shortDescription: 'Методы разработки KPI',
    description: 'Подробное руководство...',
    categoryId: 'business',
    subcategoryId: 'team_management',
    images: []
  },
  likes: [],
  exchangeOffers: [],
  created_at: '2025-12-07'
};

const mockUserWithOffer: TAuthUser = {
  ...mockUserWithoutOffers,
  exchangeOffers: [skillId]
};

const createTestStore = (
  authPartial: Partial<{
    currentUser: TAuthUser | null;
    exitsEmail: boolean;
    isLoading: boolean;
    error: string | null;
  }>
) => {
  const preloadedState = {
    auth: {
      user: mockUserWithoutOffers,
      currentUser: null,
      exitsEmail: false,
      isLoading: false,
      error: null,
      ...authPartial
    },
    categories: {
      categories: [],
      currentCategory: null,
      currentSubCategories: null,
      isLoading: false,
      error: null
    },
    cities: {
      cities: [],
      currentCity: null,
      isLoading: false,
      error: null
    },
    users: {
      users: [],
      currentUser: null,
      isLoading: false,
      error: null
    },
    skills: {
      skills: [],
      currentSkill: null,
      isLoading: false,
      error: null
    },
    registration: {
      step1: { email: '', password: '' },
      step2: null,
      step3: null,
      currentStep: 1 as const,
      isLoading: false,
      error: null
    },
    filters: {
      skills: [],
      cities: [],
      gender: 'any' as const,
      mode: 'any' as const,
      sort: null,
      searchQuery: ''
    }
  };

  return configureStore({
    reducer: rootReducer,
    preloadedState
  });
};

const wrapper =
  (store: ReturnType<typeof createTestStore>) =>
  ({ children }: { children: React.ReactNode }) => (
    <Provider store={store}>{children}</Provider>
  );

describe('useExchangeSystem', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockToggleOffersApi.mockReset();
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('должен возвращать hasOffered = false, если пользователь не авторизован', () => {
    const store = createTestStore({ currentUser: null });
    const { result } = renderHook(() => useExchangeSystem(skillId), {
      wrapper: wrapper(store)
    });
    expect(result.current.hasOffered).toBe(false);
  });

  it('не должен диспатчить toggleOffer, если пользователь не авторизован', async () => {
    const store = createTestStore({ currentUser: null });
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    const { result } = renderHook(() => useExchangeSystem(skillId), {
      wrapper: wrapper(store)
    });
    await result.current.handleOfferExchange();
    expect(dispatchSpy).toHaveBeenCalledTimes(0);
    expect(mockToggleOffersApi).not.toHaveBeenCalled();
  });

  it('не должен диспатчить toggleOffer, если предложение уже отправлено', async () => {
    const store = createTestStore({ currentUser: mockUserWithOffer });
    const { result } = renderHook(() => useExchangeSystem(skillId), {
      wrapper: wrapper(store)
    });
    await result.current.handleOfferExchange();
    expect(mockToggleOffersApi).not.toHaveBeenCalled();
  });

  it('должен вызвать toggleOffersApi и открыть модалку при успехе', async () => {
    const store = createTestStore({ currentUser: mockUserWithoutOffers });
    mockToggleOffersApi.mockResolvedValue(mockUserWithoutOffers);

    const { result } = renderHook(() => useExchangeSystem(skillId), {
      wrapper: wrapper(store)
    });

    await result.current.handleOfferExchange();

    await waitFor(() => {
      expect(result.current.isModalOpen).toBe(true);
    });

    expect(mockToggleOffersApi).toHaveBeenCalledWith({
      user: mockUserWithoutOffers,
      skillId
    });
  });

  it('не должен открывать модалку при ошибке toggleOffersApi', async () => {
    const store = createTestStore({ currentUser: mockUserWithoutOffers });
    mockToggleOffersApi.mockRejectedValue(new Error('API error'));

    const { result } = renderHook(() => useExchangeSystem(skillId), {
      wrapper: wrapper(store)
    });

    await result.current.handleOfferExchange();

    await waitFor(() => {
      expect(result.current.isModalOpen).toBe(false);
    });

    expect(console.error).toHaveBeenCalledWith(
      'Ошибка при создании предложения обмена:',
      'Ошибка обновления предложения'
    );
  });

  it('должен закрывать модалку при вызове closeModal', async () => {
    const store = createTestStore({ currentUser: mockUserWithoutOffers });
    mockToggleOffersApi.mockResolvedValue(mockUserWithoutOffers);

    const { result } = renderHook(() => useExchangeSystem(skillId), {
      wrapper: wrapper(store)
    });

    await result.current.handleOfferExchange();

    await waitFor(() => {
      expect(result.current.isModalOpen).toBe(true);
    });

    result.current.closeModal();

    await waitFor(() => {
      expect(result.current.isModalOpen).toBe(false);
    });
  });
});
