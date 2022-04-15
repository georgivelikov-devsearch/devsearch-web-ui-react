import { createSlice } from "@reduxjs/toolkit";

const developerPublicSlice = createSlice({
  name: "developerPublic",
  initialState: {},
  reducers: {
    developerPublicSuccess(state, action) {
      return { publicDeveloper: action.payload };
    },
    developerPublicError(state, action) {
      return { error: action.payload };
    },
  },
});

export const developerPublicActions = developerPublicSlice.actions;

export default developerPublicSlice.reducer;
