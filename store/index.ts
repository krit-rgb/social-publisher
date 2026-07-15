// store/index.ts

import { configureStore } from '@reduxjs/toolkit';
import platformReducer from './platformSlice'
import uiReducer from './uiSlice';
import postReducer from './postSlice';


export const store = configureStore({
  reducer: {
    platform: platformReducer,
    ui: uiReducer,
    post: postReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;