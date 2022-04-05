import { createSlice } from "@reduxjs/toolkit";

const initialDeveloperPublicState = {
  loading: false,
  publicDeveloper: {},
  error: {},
};

const developerPublicSlice = createSlice({
  name: "developerPublic",
  initialState: {},
  reducers: {
    developerPublicRequest(state, action) {
      state.loading = true;
    },
    developerPublicSuccess(state, action) {
      state.loading = false;
      state.publicDeveloper = action.payload;
    },
    developerPublicError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const developerPublicActions = developerPublicSlice.actions;

export default developerPublicSlice.reducer;
