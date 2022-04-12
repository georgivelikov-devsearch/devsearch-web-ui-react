import { createSlice } from "@reduxjs/toolkit";

const developerPublicSlice = createSlice({
  name: "developerPublic",
  initialState: {},
  reducers: {
    developerPublicRequest(state, action) {
      return { loading: true };
    },
    developerPublicSuccess(state, action) {
      return { loading: false, publicDeveloper: action.payload };
    },
    developerPublicError(state, action) {
      return { loading: false, error: action.payload };
    },
  },
});

export const developerPublicActions = developerPublicSlice.actions;

export default developerPublicSlice.reducer;
