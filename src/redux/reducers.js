import { combineReducers } from "redux";

import userReducer from "./reducers/user";
import sessionReducer from "./reducers/session";

export default combineReducers({
  user: userReducer,
  session: sessionReducer,
});
