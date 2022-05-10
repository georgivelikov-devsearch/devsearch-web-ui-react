import { configureStore } from "@reduxjs/toolkit";
// import { combineReducers, configureStore } from "@reduxjs/toolkit";
import developerReducer from "./reducers/slices/developers/developer";
import developerErrorReducer from "./reducers/slices/developers/developerError";
import developerSearchListReducer from "./reducers/slices/developers/developerSearchList";
import skillReducer from "./reducers/slices/skills/skill";
import projectReducer from "./reducers/slices/projects/project";
import loadingReducer from "./reducers/slices/global/loading";

// let comboRed = combineReducers({
//   dev: developerReducer,
//   skill: skillReducer,
// });

const store = configureStore({
  reducer: {
    loading: loadingReducer,
    developer: developerReducer,
    developerError: developerErrorReducer,
    developerSearchList: developerSearchListReducer,
    skills: skillReducer,
    project: projectReducer,
  },
});

export default store;
