import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type RegistrationStep1 = {
  email: string;
  password: string;
};

// шаг 2 – профиль
export type RegistrationStep2 = {
  name: string;
  date: string;
  gender: 'male' | 'female' | 'other';
  city: string;
  categories: string;
  subCategories: string;
  avatar: File | null;
} | null;

// шаг 3 – навык
export type RegistrationStep3 = {
  skillName: string;
  skillCategory: string;
  skillSubCategory: string;
  description: string;
  images: File[];
} | null;

// всё состояние регистрации
export type RegistrationState = {
  step1: RegistrationStep1;
  step2: RegistrationStep2;
  step3: RegistrationStep3;
  currentStep: 1 | 2 | 3;
  isLoading: boolean;
  error: string | null;
};

export type RegistrationSummary = {
  email: string;
  name: string | null;
  date: string | null;
  gender: string | null;
  city: string | null;
  categories: string | null;
  subCategories: string | null;
  avatar: File | null;
  skillName: string | null;
  skillCategory: string | null;
  skillSubCategory: string | null;
  description: string | null;
  images: File[];
};

// начальное состояние
const initialState: RegistrationState = {
  step1: {
    email: '',
    password: ''
  },
  step2: null,
  step3: null,
  currentStep: 1,
  isLoading: false,
  error: null
};

const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    saveStep1(state, action: PayloadAction<RegistrationStep1>) {
      state.step1 = action.payload;
      state.error = null;
      state.currentStep = 2;
    },
    saveStep2(state, action: PayloadAction<NonNullable<RegistrationStep2>>) {
      state.step2 = action.payload;
      state.error = null;
      state.currentStep = 3;
    },
    saveStep3(state, action: PayloadAction<NonNullable<RegistrationStep3>>) {
      state.step3 = action.payload;
      state.error = null;
    },
    prevStep(state) {
      if (state.currentStep > 1) {
        state.currentStep -= 1;
      }
    },
    nextStep(state) {
      // шаг 1 → шаг 2, НО только если email и password заполнены
      if (state.currentStep === 1) {
        const canGoNext = Boolean(state.step1.email && state.step1.password);
        if (canGoNext) {
          state.currentStep = 2;
        } else {
          state.error = 'Заполните email и пароль';
        }
        return;
      }

      // шаг 2 → шаг 3, НО только если сохранён step2
      if (state.currentStep === 2) {
        if (state.step2 !== null) {
          state.currentStep = 3;
        } else {
          state.error = 'Заполните данные профиля';
        }
        return;
      }

      // шаг 3 → дальше некуда (модалку открывает UI, не slice)
      if (state.currentStep === 3) {
        return;
      }
    },
    goToStep(state, action: PayloadAction<1 | 2 | 3>) {
      const step = action.payload;

      // 1️⃣ Переход назад всегда разрешён
      if (step < state.currentStep) {
        state.currentStep = step;
        state.error = null; // убираем ошибку при успешном переходе
        return;
      }

      // 2️⃣ Переход на шаг 1
      if (step === 1) {
        state.currentStep = 1;
        state.error = null;
        return;
      }

      // 3️⃣ Переход на шаг 2 — можно только если заполнен step1
      if (step === 2) {
        const canGoStep2 = Boolean(state.step1.email && state.step1.password);

        if (canGoStep2) {
          state.currentStep = 2;
          state.error = null;
        } else {
          state.error = 'Сначала заполните email и пароль';
        }
        return;
      }

      // 4️⃣ Переход на шаг 3 — можно только если заполнены step1 И step2
      if (step === 3) {
        const step1Done = Boolean(state.step1.email && state.step1.password);
        const step2Done = Boolean(state.step2);

        if (step1Done && step2Done) {
          state.currentStep = 3;
          state.error = null;
        } else if (!step2Done) {
          state.error = 'Сначала заполните данные профиля';
        } else {
          state.error = 'Заполните предыдущие шаги';
        }
      }
    },
    // - setError(error) — установка ошибки
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },

    // 8 - clearError() — очистка ошибки
    clearError(state) {
      state.error = null;
    },

    // 6 - clearRegistrationData() — полная очистка всех данных
    clearRegistrationData() {
      return initialState;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    }
  }
});

export const {
  saveStep1,
  saveStep2,
  saveStep3,
  prevStep,
  nextStep,
  goToStep,
  setError,
  clearError,
  clearRegistrationData,
  setLoading
} = registrationSlice.actions;

export const registrationReducer = registrationSlice.reducer;
