import { combineReducers, createStore, applyMiddleware } from "redux";
import { loginReducer } from "./reducers/login";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { profileReducer } from "./reducers/profile";
import { channelReducer } from "./reducers/channel";
import { articleReducer } from "./reducers/artical";
import { commentReducer } from "./reducers/comment";
//组合出根Reducer
const reducer = combineReducers({
  login: loginReducer,
  profile: profileReducer,
  channel: channelReducer,
  article: articleReducer,
  comment: commentReducer,
});
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
export default store;
