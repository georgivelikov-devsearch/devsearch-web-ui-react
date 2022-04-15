import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
  name: "loading",
  initialState: { loading: false },
  reducers: {
    startLoading(state, action) {
      return { loading: true };
    },
    stopLoading(state, actions) {
      return { loading: false };
    },
  },
});

export const loadingActions = loadingSlice.actions;

export default loadingSlice.reducer;
