import type { TUser } from '../../../../entities/users.ts';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsersApi } from '../../../../api';

export type UsersSlice = {
  users: TUser[];
  currentUser: TUser | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: UsersSlice = {
  users: [],
  currentUser: null,
  isLoading: false,
  error: null
};

export const fetchGetUsers = createAsyncThunk(
  'users/fetchGetUsers',
  async (_, { rejectWithValue }) => {
    try {
      return await getUsersApi();
    } catch {
      return rejectWithValue('Ошибка получения списка пользователей');
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.currentUser = null;
        state.users = [];
      })
      .addCase(fetchGetUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.currentUser = null;
        state.users = action.payload;
      })
      .addCase(fetchGetUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.currentUser = null;
        state.users = [];
      });
  }
});

export default usersSlice.reducer;
