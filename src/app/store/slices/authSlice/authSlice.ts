import type { TAuthUser } from '../../../../entities/authUser.ts';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginApi, logoutApi } from '../../../../api';

export type AuthState = {
  currentUser: TAuthUser | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  currentUser: null,
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

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // --- LOGIN ---
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

      // --- LOGOUT ---
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
      });
  }
});

export default authSlice.reducer;
