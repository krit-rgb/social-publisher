import { configureStore } from '@reduxjs/toolkit';

import platformReducer from './platformSlice';
import uiReducer from './uiSlice';
import postReducer from './postSlice';
import analyticsReducer from '@/selectors/analyticsSlice'; // <-- analyticsSlice, NOT analyticsSelectors

export const store = configureStore({
  reducer: {
    platform: platformReducer,
    ui: uiReducer,
    post: postReducer,
    analytics: analyticsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;