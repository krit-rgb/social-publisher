// store/platformSlice.ts

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { PlatformId } from '@/types/platform';

interface PlatformState {
  selectedPlatformIds: PlatformId[];
}

const initialState: PlatformState = {
  selectedPlatformIds: [],
};

const platformSlice = createSlice({
  name: 'platform',
  initialState,
  reducers: {
    togglePlatform: (state, action: PayloadAction<PlatformId>) => {
      const id = action.payload;
      const index = state.selectedPlatformIds.indexOf(id);
      if (index === -1) {
        state.selectedPlatformIds.push(id);
      } else {
        state.selectedPlatformIds.splice(index, 1);
      }
    },
    setSelectedPlatforms: (state, action: PayloadAction<PlatformId[]>) => {
      state.selectedPlatformIds = action.payload;
    },
    clearSelectedPlatforms: (state) => {
      state.selectedPlatformIds = [];
    },
  },
});

export const { togglePlatform, setSelectedPlatforms, clearSelectedPlatforms } =
  platformSlice.actions;
export default platformSlice.reducer;