import { createSlice } from "@reduxjs/toolkit";

const developerErrorSlice = createSlice({
  name: "developerError",
  initialState: {
    developerError: null,
    developerPublicError: null,
    developerEditError: null,
    developerListError: null,
  },
  reducers: {
    // errors related to developer.js actions when getting private user information
    developerError(state, action) {
      return { ...state, developerError: action.payload };
    },
    developerErrorClear(state, action) {
      return { ...state, developerError: null };
    },
    // errors related to developer.js actions when getting public user information
    developerPublicError(state, action) {
      return { ...state, developerPublicError: action.payload };
    },
    developerPublicErrorClear(state, action) {
      return { ...state, developerPublicError: null };
    },
    // errors related to developer.js actions when editing developer
    developerEditError(state, action) {
      return { ...state, developerEditError: action.payload };
    },
    developerEditErrorClear(state, action) {
      return { ...state, developerEditError: null };
    },
    // errors related to developerList.js actions
    developerListError(state, action) {
      return { ...state, developerListError: action.payload };
    },
    developerListErrorClear(state, action) {
      return { ...state, developerListError: null };
    },
  },
});

export const developerErrorActions = developerErrorSlice.actions;

export default developerErrorSlice.reducer;
