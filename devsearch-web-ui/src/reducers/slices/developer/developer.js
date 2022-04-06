import { createSlice } from "@reduxjs/toolkit";

const developerSlice = createSlice({
  name: "developer",
  initialState: {},
  reducers: {
    developerRequest(state, action) {
      return { loading: true };
    },
    developerSuccess(state, action) {
      return { loading: false, developer: action.payload };
    },
    developerError(state, action) {
      return { loading: false, error: action.payload };
    },
  },
});

export const developerActions = developerSlice.actions;

export default developerSlice.reducer;
