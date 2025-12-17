import type { TAuthUser } from '../../../../entities/authUser.ts';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginApi, logoutApi } from '../../../../api';
import {
  type TLikePayload,
  type TOffersPayload,
  toggleLikeApi,
  toggleOffersApi,
  type TUpdatePayload,
  updateProfileApi
} from '../../../../api/auth/authChangeApi.ts';
import {
  checkEmailApi,
  registerApi,
  type TRegisterPayload
} from '../../../../api/auth/authRegistration.ts';

export type AuthState = {
  currentUser: TAuthUser | null;
  exitsEmail: boolean;
  isLoading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  currentUser: JSON.parse(localStorage.getItem('current_user') ?? 'null'),
  exitsEmail: false,
  isLoading: false,
  error: null
};

export const login = createAsyncThunk<
  TAuthUser,
  { login: string; password: string },
  { rejectValue: string }
>('auth/login', async (data, { rejectWithValue }) => {
  try {
    return await loginApi(data);
  } catch (ex: any) {
    return rejectWithValue(ex?.message || 'Ошибка авторизации пользователя');
  }
});

export const logout = createAsyncThunk<
  void,
  string | undefined,
  { rejectValue: string }
>('auth/logout', async (userId, { rejectWithValue }) => {
  try {
    await logoutApi(userId);
  } catch {
    return rejectWithValue('Ошибка разлогинивания пользователя');
  }
});

export const updateProfile = createAsyncThunk<
  TAuthUser,
  TUpdatePayload,
  { rejectValue: string }
>('auth/updateProfile', async (data, { rejectWithValue }) => {
  try {
    return await updateProfileApi(data);
  } catch {
    return rejectWithValue('Ошибка обновления профиля пользователя');
  }
});

export const toggleLike = createAsyncThunk<
  TAuthUser,
  TLikePayload,
  { rejectValue: string }
>('auth/toggleLike', async (data, { rejectWithValue }) => {
  try {
    return await toggleLikeApi(data);
  } catch {
    return rejectWithValue('Ошибка обновления лайка карточки');
  }
});

export const toggleOffer = createAsyncThunk<
  TAuthUser,
  TOffersPayload,
  { rejectValue: string }
>('auth/toggleOffer', async (data, { rejectWithValue }) => {
  try {
    return await toggleOffersApi(data);
  } catch {
    return rejectWithValue('Ошибка обновления предложения');
  }
});

export const register = createAsyncThunk<
  TAuthUser,
  TRegisterPayload,
  { rejectValue: string }
>('auth/register', async (data, { rejectWithValue }) => {
  try {
    return await registerApi(data);
  } catch (ex: any) {
    return rejectWithValue(ex?.message || 'Ошибка регистрации пользователя');
  }
});

export const checkEmail = createAsyncThunk<
  boolean,
  string,
  { rejectValue: string }
>('auth/checkEmail', async (email, { rejectWithValue }) => {
  try {
    return await checkEmailApi(email);
  } catch {
    return rejectWithValue('Ошибка проверки email');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.currentUser = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.currentUser = action.payload;
        localStorage.setItem('current_user', JSON.stringify(action.payload));
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Ошибка авторизации пользователя';
        state.currentUser = null;
      })

      .addCase(logout.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.currentUser = null;
        localStorage.removeItem('current_user');
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Ошибка разлогинивания пользователя';
      })

      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
        localStorage.setItem('current_user', JSON.stringify(action.payload));
      })

      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(toggleLike.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(toggleLike.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
        localStorage.setItem('current_user', JSON.stringify(action.payload));
      })

      .addCase(toggleLike.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(toggleOffer.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(toggleOffer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
        localStorage.setItem('current_user', JSON.stringify(action.payload));
      })

      .addCase(toggleOffer.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        localStorage.setItem('current_user', JSON.stringify(action.payload));
        state.currentUser = action.payload;
      })

      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Ошибка регистрации пользователя';
      })

      .addCase(checkEmail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(checkEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.exitsEmail = action.payload;
      })

      .addCase(checkEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Ошибка запроса проверки эл.почты';
      });
  }
});

export default authSlice.reducer;
