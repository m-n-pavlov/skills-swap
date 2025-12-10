import type { TSkill } from '../../../../entities/skills.ts';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getSkillsApi } from '../../../../api';

export type SkillsSlice = {
  skills: TSkill[];
  currentSkill: TSkill | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: SkillsSlice = {
  skills: [],
  currentSkill: null,
  isLoading: false,
  error: null
};

export const fetchGetSkills = createAsyncThunk(
  'users/fetchGetSkills',
  async (_, { rejectWithValue }) => {
    try {
      return await getSkillsApi();
    } catch {
      return rejectWithValue('Ошибка получения списка навыков');
    }
  }
);

const skillsSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetSkills.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.currentSkill = null;
        state.skills = [];
      })
      .addCase(fetchGetSkills.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.currentSkill = null;
        state.skills = action.payload;
      })
      .addCase(fetchGetSkills.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.currentSkill = null;
        state.skills = [];
      });
  }
});

export default skillsSlice.reducer;
