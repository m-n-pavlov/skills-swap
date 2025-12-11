import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { registerApi } from '../../../../api';
import type { TUser } from '../../../../entities/users.ts';

export interface RegistrationState {
  step1: { email: string; password: string };
  step2: {
    name: string;
    avatarUrl: File | null;
    birthday: string;
    gender: 'male' | 'female' | 'other';
    cityId: string;
    learningCategoryId: string;
    learningSubcategoryId: string;
  } | null;
  step3: {
    skillName: string;
    skillCategoryId: string;
    skillSubcategoryId: string;
    description: string;
    images: File[];
  } | null;

  currentStep: 1 | 2 | 3;

  isLoading: boolean;
  error: string | null;
}

const initialState: RegistrationState = {
  step1: { email: '', password: '' },
  step2: {
    name: '',
    birthday: '',
    gender: 'male',
    cityId: '',
    learningCategoryId: '',
    learningSubcategoryId: '',
    avatarUrl: null
  },
  step3: {
    skillName: '',
    skillCategoryId: '',
    skillSubcategoryId: '',
    description: '',
    images: []
  },
  currentStep: 1,
  isLoading: false,
  error: null
};

export const fetchRegister = createAsyncThunk(
  'auth/register',
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as { registration: RegistrationState };
    const reg = state.registration;

    if (!reg.step1 || !reg.step2 || !reg.step3)
      return rejectWithValue('Форма заполнена не полностью');

    const formData = new FormData();

    Object.entries({
      ...reg.step1,
      ...reg.step2,
      ...reg.step3
    }).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value);
      } else if (Array.isArray(value)) {
        value.forEach((v) => formData.append(key, v));
      } else {
        formData.append(key, String(value));
      }
    });

    const res = await registerApi(formData);
    return res.user;
  }
);

export const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    setStep(state, action) {
      state.currentStep = action.payload;
    },
    setStep1(state, action) {
      state.step1 = { ...state.step1, ...action.payload };
    },
    setStep2(state, action) {
      state.step2 = { ...(state.step2 ?? {}), ...action.payload };
    },
    setStep3(state, action) {
      state.step3 = { ...(state.step3 ?? {}), ...action.payload };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegister.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.isLoading = false;
        const user: TUser = action.payload;
        console.log(user);
        localStorage.setItem('user', JSON.stringify(user));
      })
      .addCase(fetchRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

export const { setStep, setStep1, setStep2, setStep3 } =
  registrationSlice.actions;

export default registrationSlice.reducer;
