import type { TUser } from '../../../../entities/users.ts';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginApi, logoutApi } from '../../../../api/auth/authApi.ts';

export type AuthSliceState = {
  user: TUser | null;
  isAuth: boolean;
  isLoading: boolean;
  error: string | null;
};

const initialState: AuthSliceState = {
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  isAuth: !!localStorage.getItem('user'),
  isLoading: false,
  error: null
};

export const fetchLogin = createAsyncThunk(
  'auth/login',
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await loginApi(data);
      return res.user;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Ошибка входа');
    }
  }
);

export const fetchLogout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
      return true;
    } catch {
      return rejectWithValue('Ошибка выхода');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // LOGIN
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuth = true;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAuth = false;
        state.user = null;
      });

    // LOGOUT
    builder
      .addCase(fetchLogout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchLogout.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuth = false;
        state.user = null;
      })
      .addCase(fetchLogout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

export default authSlice.reducer;
