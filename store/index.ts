// store/index.ts

import { configureStore } from '@reduxjs/toolkit';
import platformReducer from './platformSlice'
import uiReducer from './uiSlice';

export const store = configureStore({
  reducer: {
    platform: platformReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;