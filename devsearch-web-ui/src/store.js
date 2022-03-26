import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  profileReducer,
  editProfileReducer,
  publicProfileReducer,
  profileListReducer,
  searchProfileListReducer,
} from "./reducers/profileReducers";

const reducer = combineReducers({
  profile: profileReducer,
  editProfile: editProfileReducer,
  publicProfile: publicProfileReducer,
  profileList: profileListReducer,
  searchProfileList: searchProfileListReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
