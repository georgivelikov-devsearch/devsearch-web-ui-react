import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  developerReducer,
  editDeveloperReducer,
  publicDeveloperReducer,
  developerListReducer,
  searchDeveloperListReducer,
} from "./reducers/developerReducers";

const reducer = combineReducers({
  developer: developerReducer,
  editDeveloper: editDeveloperReducer,
  publicDeveloper: publicDeveloperReducer,
  developerList: developerListReducer,
  searchDeveloperList: searchDeveloperListReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
