// store/uiSlice.ts (full updated file)

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { PlatformId } from '@/types/platform';
import type { PostStatus } from '@/types/post';

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
  searchQuery: string;
  filterPlatform: PlatformId | 'all';
  filterStatus: PostStatus | 'all';
}

const initialState: UiState = {
  isLoading: false,
  globalError: null,
  activeDashboardTab: 'posts',
  isComposeModalOpen: false,
  toasts: [],
  searchQuery: '',
  filterPlatform: 'all',
  filterStatus: 'all',
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
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setFilterPlatform: (state, action: PayloadAction<PlatformId | 'all'>) => {
      state.filterPlatform = action.payload;
    },
    setFilterStatus: (state, action: PayloadAction<PostStatus | 'all'>) => {
      state.filterStatus = action.payload;
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
  setSearchQuery,
  setFilterPlatform,
  setFilterStatus,
} = uiSlice.actions;
export default uiSlice.reducer;