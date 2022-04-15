import { createSlice } from "@reduxjs/toolkit";

const developerSlice = createSlice({
  name: "developer",
  initialState: {},
  reducers: {
    clearError(state, action) {
      return { ...state, error: null };
    },
    developerSuccess(state, action) {
      return { developer: action.payload };
    },
    developerError(state, action) {
      return { error: action.payload };
    },
    developerPublicSuccess(state, action) {
      return { developer: action.payload };
    },
    developerPublicError(state, action) {
      return { error: action.payload };
    },
  },
});

export const developerActions = developerSlice.actions;

export default developerSlice.reducer;
