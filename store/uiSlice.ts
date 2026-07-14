// store/uiSlice.ts

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type DashboardTab = 'analytics' | 'calendar' | 'posts';

interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface UiState {
  isLoading: boolean;
  globalError: string | null;
  activeDashboardTab: DashboardTab;
  isComposeModalOpen: boolean;
  toasts: ToastMessage[];
}

const initialState: UiState = {
  isLoading: false,
  globalError: null,
  activeDashboardTab: 'posts',
  isComposeModalOpen: false,
  toasts: [],
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setGlobalError: (state, action: PayloadAction<string | null>) => {
      state.globalError = action.payload;
    },
    setActiveDashboardTab: (state, action: PayloadAction<DashboardTab>) => {
      state.activeDashboardTab = action.payload;
    },
    setComposeModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isComposeModalOpen = action.payload;
    },
    addToast: (state, action: PayloadAction<Omit<ToastMessage, 'id'>>) => {
      state.toasts.push({ id: crypto.randomUUID(), ...action.payload });
    },
    removeToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload);
    },
  },
});

export const {
  setLoading,
  setGlobalError,
  setActiveDashboardTab,
  setComposeModalOpen,
  addToast,
  removeToast,
} = uiSlice.actions;
export default uiSlice.reducer;