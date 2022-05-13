import { configureStore } from "@reduxjs/toolkit";
// import { combineReducers, configureStore } from "@reduxjs/toolkit";
import developerReducer from "./reducers/slices/developers/developer";
import developerErrorReducer from "./reducers/slices/developers/developerError";
import skillReducer from "./reducers/slices/skills/skill";
import projectReducer from "./reducers/slices/projects/project";
import loadingReducer from "./reducers/slices/global/loading";

const store = configureStore({
  reducer: {
    loading: loadingReducer,
    developer: developerReducer,
    developerError: developerErrorReducer,
    skill: skillReducer,
    project: projectReducer,
  },
});

export default store;
