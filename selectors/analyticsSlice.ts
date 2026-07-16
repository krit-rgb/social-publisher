import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AnalyticsRange = 7 | 30 | 90 | null;

interface AnalyticsState {
  rangeDays: AnalyticsRange;
}

const initialState: AnalyticsState = {
  rangeDays: 30,
};

const analyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {
    setAnalyticsRange(
      state,
      action: PayloadAction<AnalyticsRange>
    ) {
      state.rangeDays = action.payload;
    },
  },
});

export const { setAnalyticsRange } = analyticsSlice.actions;

export default analyticsSlice.reducer;