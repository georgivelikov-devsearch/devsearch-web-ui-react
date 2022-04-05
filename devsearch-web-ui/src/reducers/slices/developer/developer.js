import { createSlice } from "@reduxjs/toolkit";

const initialDeveloperState = { loading: false, developer: {}, error: {} };

const developerSlice = createSlice({
  name: "developer",
  initialState: {},
  reducers: {
    developerRequest(state, action) {
      state.loading = true;
    },
    developerSuccess(state, action) {
      state.loading = false;
      state.developer = action.payload;
    },
    developerError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const developerActions = developerSlice.actions;

export default developerSlice.reducer;
